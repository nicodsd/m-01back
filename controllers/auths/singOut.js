import User from "../../models/UserAuth.js";
const signout = async (req, res, next) => {
  console.log(req.body)
  try {
    const userId = req.body.user_id;

    if (userId) {
      await User.findByIdAndUpdate(userId, { is_online: false });
    }

    /*     const cookieOptions = {
          httpOnly: true,
          secure: true,
          sameSite: "none",
          domain: ".qmenu.digital",
          path: "/",
        }; */
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: ".qmenu.digital",
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