import User from "../models/User.js";

async function accountIsOnline(req, res, next) {
  const reqEmail = req.body.email;
  let user = await User.findOne({ email: reqEmail });
  if (user.is_online === true) {
    return res.status(400).json({
      succes: false,
      statusCode: 400,
      message: "Account is already signed in from another device",
    });
  }
  next();
}

export default accountIsOnline;
