import User from "../../models/UserAuth.js";
const signout = async (req, res, next) => {
  try {
    const userId = req.body.user_id;
    console.log(userId);

    if (userId) {
      await User.findByIdAndUpdate(userId, { is_online: false });
    }

    return res.status(200).json({
      success: true,
      message: "Sesión cerrada correctamente"
    });
  } catch (error) {
    next(error);
  }
};
export default signout;