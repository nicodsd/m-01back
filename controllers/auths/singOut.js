import User from "../../models/UserAuth.js";
const signout = async (req, res, next) => {
  console.log(req.cookies);
  try {
    const id = req.cookies.user_id;
    const userOffline = await User.findOneAndUpdate(
      { _id: id },
      { is_online: false },
      { new: true }
    );
    const domainHost = process.env.FRONTEND_URL
      ? process.env.FRONTEND_URL.replace(/^(https?:\/\/)/, "").split(":")[0]
      : undefined;

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      domain: domainHost
    });
    res.clearCookie("user", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      domain: domainHost
    });
    return res.status(200).json({
      message: "User signed out successfully",
      success: true,
      user: userOffline?.name,
    });
  } catch (error) {
    next(error);
  }
};
export default signout;