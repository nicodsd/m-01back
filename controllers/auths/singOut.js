import User from "../../models/UserAuth.js";
import presenceStore from "../../services/presenceStore.js";
const signout = async (req, res, next) => {
  try {
    const userId = req.body.user_id;

    if (userId) {
      await User.findByIdAndUpdate(userId, { is_online: false });
      presenceStore.markOffline(String(userId));
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