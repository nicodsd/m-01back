import User from "../../models/UserAuth.js";
const signout = async (req, res, next) => {
  try {
    const userId = req.body.user_id;

    if (userId) {
      await User.findByIdAndUpdate(userId, { is_online: false });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    };

    res.clearCookie("token", cookieOptions);
    res.clearCookie("user", cookieOptions);

    return res.status(200).json({
      success: true,
      message: "Cookies eliminadas"
    });
  } catch (error) {
    next(error);
  }
};
export default signout;