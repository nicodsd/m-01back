import User from "../../models/User.js";
import jwt from "jsonwebtoken";
let $key;

let signUp = async (req, res, next) => {
  try {
    $key = process.env.JWT_SECRET_KEY;
    let newUser = new User(req.body);
    const token = jwt.sign({ ...newUser._doc }, $key, {
      expiresIn: 60 * 60 * 24,
    });
    await newUser.save();
    return res.status(201).json({
      user: newUser,
      success: true,
      timeStamps: newUser.createdAt,
      token,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default signUp;
