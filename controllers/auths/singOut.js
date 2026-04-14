import User from "../../models/UserAuth.js";
const signout = async (req, res, next) => {
  try {
    const id = req.user._id;
    const userOffline = await User.findOneAndUpdate(
      { _id: id },
      { is_online: false },
      { new: true }
    );
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });
    res.clearCookie("user", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
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