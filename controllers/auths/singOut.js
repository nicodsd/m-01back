import User from "../../models/User.js";

const signout = async (req, res, next) => {
  const id = req.user._id;
  try {
    let userOffline = await User.findOneAndUpdate(
      { _id: id },
      { is_online: false }
    );
    return res.status(200).json({
      message: "User signed out successfully",
      success: true,
      userOffline,
    });
  } catch (error) {
    next(error);
  }
};

export default signout;
