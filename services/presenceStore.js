const SESSION_TTL_MS = 50_000; // 50s sin heartbeat => offline
const SWEEP_INTERVAL_MS = 15_000; // Barrido de sesiones expiradas cada 15s

class PresenceStore {
  constructor() {
    /** @type {Map<string, { userId: string, email: string, name: string, role: string, plan: string, connectedAt: number, lastSeen: number, tabs: Map<string, { tabId: string, path: string, status: 'active' | 'idle', lastSeen: number }> }>} */
    this.users = new Map();
    /** @type {Set<(event: any) => void>} */
    this.listeners = new Set();
    this.sweepTimer = null;
    this.startSweepTimer();
  }

  startSweepTimer() {
    if (this.sweepTimer) return;
    this.sweepTimer = setInterval(() => {
      this.pruneExpired();
    }, SWEEP_INTERVAL_MS);

    if (typeof this.sweepTimer.unref === "function") {
      this.sweepTimer.unref();
    }
  }

  toSnapshot(entry) {
    let latestTab = null;
    let hasActiveTab = false;

    for (const tab of entry.tabs.values()) {
      if (tab.status === "active") {
        hasActiveTab = true;
      }
      if (!latestTab || tab.lastSeen >= latestTab.lastSeen) {
        latestTab = tab;
      }
    }

    return {
      userId: entry.userId,
      email: entry.email,
      name: entry.name,
      role: entry.role,
      plan: entry.plan,
      currentPath: latestTab?.path || "/",
      status: hasActiveTab ? "active" : "idle",
      connectedAt: entry.connectedAt,
      lastSeen: entry.lastSeen,
      tabsCount: entry.tabs.size,
    };
  }

  emit(type, user) {
    const onlineUsers = this.getOnlineUsers(false);
    const event = {
      type,
      user,
      onlineUsers,
      timestamp: Date.now(),
    };

    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch (err) {
        console.error("[PresenceStore] Error notifying listener:", err);
      }
    }
  }

  pruneExpired(now = Date.now()) {
    const expiredUsers = [];

    for (const [key, entry] of this.users.entries()) {
      let tabsRemoved = false;

      for (const [tabId, tab] of entry.tabs.entries()) {
        if (now - tab.lastSeen > SESSION_TTL_MS) {
          entry.tabs.delete(tabId);
          tabsRemoved = true;
        }
      }

      if (entry.tabs.size === 0) {
        const snapshot = this.toSnapshot(entry);
        this.users.delete(key);
        expiredUsers.push(snapshot);
      } else if (tabsRemoved) {
        this.emit("USER_UPDATED", this.toSnapshot(entry));
      }
    }

    for (const snapshot of expiredUsers) {
      this.emit("USER_OFFLINE", snapshot);
    }
  }

  heartbeat(payload) {
    const now = Date.now();
    this.pruneExpired(now);

    const key = String(payload.userId || payload.email || "").trim();
    if (!key) return null;

    const tabId = String(payload.tabId || "default").trim().slice(0, 64) || "default";
    const path =
      typeof payload.path === "string" && payload.path.startsWith("/")
        ? payload.path.slice(0, 200)
        : "/";
    const status = payload.status === "idle" ? "idle" : "active";

    const existing = this.users.get(key);

    if (!existing) {
      const tabs = new Map();
      tabs.set(tabId, { tabId, path, status, lastSeen: now });

      const created = {
        userId: String(payload.userId || key),
        email: String(payload.email || ""),
        name: String(payload.name || payload.email || "Usuario"),
        role: String(payload.role || "client"),
        plan: String(payload.plan || "free").toLowerCase(),
        connectedAt: now,
        lastSeen: now,
        tabs,
      };

      this.users.set(key, created);
      const snapshot = this.toSnapshot(created);
      this.emit("USER_ONLINE", snapshot);
      return snapshot;
    }

    const prevSnapshot = this.toSnapshot(existing);

    if (payload.email) existing.email = String(payload.email);
    if (payload.name) existing.name = String(payload.name);
    if (payload.role) existing.role = String(payload.role);
    if (payload.plan) existing.plan = String(payload.plan).toLowerCase();
    existing.lastSeen = now;

    // Si llega un tabId real del navegador, limpiamos el tab temporal de login
    if (tabId !== "session-login" && existing.tabs.has("session-login")) {
      existing.tabs.delete("session-login");
    }

    existing.tabs.set(tabId, { tabId, path, status, lastSeen: now });

    const nextSnapshot = this.toSnapshot(existing);
    const meaningfulChange =
      prevSnapshot.currentPath !== nextSnapshot.currentPath ||
      prevSnapshot.status !== nextSnapshot.status ||
      prevSnapshot.tabsCount !== nextSnapshot.tabsCount ||
      prevSnapshot.name !== nextSnapshot.name ||
      prevSnapshot.plan !== nextSnapshot.plan;

    if (meaningfulChange) {
      this.emit("USER_UPDATED", nextSnapshot);
    }

    return nextSnapshot;
  }

  markOffline(userKey, tabId) {
    const normalizedKey = String(userKey || "").trim();
    if (!normalizedKey) return;

    let targetKey = this.users.has(normalizedKey) ? normalizedKey : null;

    if (!targetKey) {
      const lower = normalizedKey.toLowerCase();
      for (const [k, entry] of this.users.entries()) {
        if (entry.email?.toLowerCase() === lower) {
          targetKey = k;
          break;
        }
      }
    }

    if (!targetKey) return;
    const existing = this.users.get(targetKey);
    if (!existing) return;

    if (tabId) {
      existing.tabs.delete(tabId);
      if (existing.tabs.size > 0) {
        this.emit("USER_UPDATED", this.toSnapshot(existing));
        return;
      }
    }

    const snapshot = this.toSnapshot(existing);
    this.users.delete(targetKey);
    this.emit("USER_OFFLINE", snapshot);
  }

  getOnlineUsers(runPrune = true) {
    if (runPrune) {
      this.pruneExpired();
    }

    return Array.from(this.users.values())
      .map((entry) => this.toSnapshot(entry))
      .sort((a, b) => {
        if (a.status !== b.status) {
          return a.status === "active" ? -1 : 1;
        }
        return b.lastSeen - a.lastSeen;
      });
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }
}

const presenceStore = new PresenceStore();
export default presenceStore;
