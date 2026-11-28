import jwt from "jsonwebtoken";
import UserAuth from "../models/UserAuth.js";
import presenceStore from "../services/presenceStore.js";

const ADMIN_EMAIL = "nilonb7@gmail.com";

function extractToken(req) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice(7).trim();
    if (token && token !== "{}") return token;
  }
  const cookieToken = req.cookies?.token;
  if (typeof cookieToken === "string" && cookieToken && cookieToken !== "{}") {
    return cookieToken;
  }
  return null;
}

function verifyToken(token) {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch {
    return null;
  }
}

export const heartbeat = async (req, res) => {
  try {
    const token = extractToken(req);
    const decoded = verifyToken(token);

    if (!decoded || (!decoded._id && !decoded.id && !decoded.email)) {
      return res.status(401).json({
        success: false,
        tracked: false,
        message: "No autorizado",
      });
    }

    const userId = String(decoded._id || decoded.id || decoded.email).trim();
    const body = req.body || {};

    let email = String(decoded.email || body.email || "").trim();
    let name = typeof body.name === "string" ? body.name.trim() : "";
    let role = typeof body.role === "string" ? body.role.trim() : "";
    let plan = String(decoded.plan || body.plan || "").trim().toLowerCase();

    // Si faltan datos descriptivos (ej. nombre o rol), los consultamos una vez en DB
    if (!name || !role || !email) {
      const dbUser = await UserAuth.findById(userId)
        .select("name email role plan")
        .lean()
        .catch(() => null);

      if (dbUser) {
        if (!email) email = dbUser.email || "";
        if (!name) name = dbUser.name || email || "Usuario";
        if (!role) role = dbUser.role || "client";
        if (!plan) plan = String(dbUser.plan || "free").toLowerCase();
      }
    }

    const snapshot = presenceStore.heartbeat({
      userId,
      email,
      name: name || email || "Usuario",
      role: role || "client",
      plan: plan || "free",
      path: typeof body.path === "string" ? body.path : "/",
      tabId: typeof body.tabId === "string" ? body.tabId : "default",
      status: body.status === "idle" ? "idle" : "active",
    });

    return res.status(200).json({
      success: true,
      tracked: Boolean(snapshot),
      status: snapshot?.status || "active",
    });
  } catch (error) {
    console.error("[Presence] Heartbeat error:", error);
    return res.status(500).json({
      success: false,
      tracked: false,
      message: "Error interno",
    });
  }
};

export const offline = async (req, res) => {
  try {
    const token = extractToken(req);
    const decoded = verifyToken(token);

    if (!decoded || (!decoded._id && !decoded.id && !decoded.email)) {
      return res.status(200).json({ success: true });
    }

    const userId = String(decoded._id || decoded.id || decoded.email).trim();
    const body = req.body || {};
    const allTabs = body.allTabs === true;
    const tabId =
      !allTabs && typeof body.tabId === "string" && body.tabId.trim()
        ? body.tabId.trim().slice(0, 64)
        : undefined;

    presenceStore.markOffline(userId, tabId);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("[Presence] Offline error:", error);
    return res.status(500).json({ success: false, message: "Error interno" });
  }
};

export const getOnlineUsers = (req, res) => {
  const token = extractToken(req);
  const decoded = verifyToken(token);
  if (!decoded || decoded.email !== ADMIN_EMAIL) {
    return res.status(403).json({
      success: false,
      message: "No autorizado",
    });
  }

  const wantsStream =
    req.query?.stream === "1" ||
    req.headers.accept?.includes("text/event-stream");

  if (!wantsStream) {
    const users = presenceStore.getOnlineUsers();
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).json({
      success: true,
      count: users.length,
      users,
      timestamp: Date.now(),
    });
  }

  return streamOnlineUsers(req, res);
};

export const streamOnlineUsersProtected = (req, res) => {
  const token = extractToken(req);
  const decoded = verifyToken(token);
  if (!decoded || decoded.email !== ADMIN_EMAIL) {
    return res.status(403).json({
      success: false,
      message: "No autorizado",
    });
  }

  return streamOnlineUsers(req, res);
};

export const streamOnlineUsers = (req, res) => {
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  if (typeof res.flushHeaders === "function") {
    res.flushHeaders();
  }

  const sendData = (payload) => {
    try {
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    } catch {
      // Stream closed
    }
  };

  sendData({
    type: "INITIAL_ONLINE_USERS",
    onlineUsers: presenceStore.getOnlineUsers(),
    timestamp: Date.now(),
  });

  const unsubscribe = presenceStore.subscribe((event) => {
    sendData(event);
  });

  const keepAlive = setInterval(() => {
    try {
      res.write(": ping\n\n");
    } catch {
      // Stream closed
    }
  }, 25_000);

  req.on("close", () => {
    clearInterval(keepAlive);
    unsubscribe();
  });
};
