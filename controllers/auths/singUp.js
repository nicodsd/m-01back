import createHttpError from "http-errors";
import User from "../../models/User.js";
import crypto from "crypto";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

let signUp = async (req, res, next) => {
  console.log("LO QUE LLEGA DEL FRONT", req.body);
  req.body.role = 0;
  req.body.is_online = true;
  req.body.is_verified = true;
  req.body.verify_code = crypto.randomBytes(10).toString("hex");
  req.body.password = bcryptjs.hashSync(req.body.password, 10);

  const token = jwt.sign({ id: req.body.id }, process.env.SECRET, {
    expiresIn: 60 * 60 * 24,
  });

  try {
    let one = new User(req.body);
    await one.save();
    return res.status(201).json({
      user: one,
      success: true,
      timeStamps: one.createdAt,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default signUp;
