import User from "../models/User.js";

const userAlreadyExist = async (req, res, next) => {
  // Lógica para verificar si el usuario ya existe en la base de datos
  // Por ejemplo, podrías hacer una consulta a la base de datos aquí
  // Si el usuario existe, asignarlo a la variable 'user'
  let user = null;
  try {
    user = await User.findOne({ email: user });
    if (user) {
      return res.status(409).json({
        message: "User already exists",
      });
    }
  } catch (error) {
    return next(error);
  }
  next();
};

export default userAlreadyExist;
