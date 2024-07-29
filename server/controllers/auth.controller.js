const errorHandler = require("../lib/err.js");
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  const { username, password, role } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return next(errorHandler(400, "User already exists"));
    }

    user = new User({ username, password, role });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("access_token", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return responseHandler(res, 201, user, "user saved successfully");
  } catch (err) {
    console.error("SignUp: ", err.message);
    return next(err);
  }
};
const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });

    if (!user) {
      return next(errorHandle(400, "Invalid credentials"));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(errorHandle(400, "Invalid credentials"));
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie("access_token", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return responseHandler(res, 200, user, "user logged in successfully");
  } catch (err) {
    console.error("SignIn: ", err.message);
    return next(err);
  }
};
const forgetPassword = (req, res, next) => {};
const resetPassword = (req, res, next) => {};

module.exports = {
  signIn,
  signUp,
  forgetPassword,
  resetPassword,
};
