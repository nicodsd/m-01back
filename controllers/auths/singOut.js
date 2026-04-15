import User from "../../models/UserAuth.js";
const signout = async (req, res, next) => {
  try {
    // Intentamos sacar el ID del body si req.user no existe por el 401
    const userId = req.user?._id || req.body.user_id;

    if (userId) {
      await User.findByIdAndUpdate(userId, { is_online: false });
    }

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    };

    // Esto le dice al navegador: "borra esto"
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