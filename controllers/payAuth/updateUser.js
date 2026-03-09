import User from "../../models/UserAuth.js";
export default async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    console.log("body recibido en updateUser:", updates);
    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) return next(new Error("Usuario no encontrado"));

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    next(error);
  }
}