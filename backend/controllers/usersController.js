const asyncHandler = require("../middlewares/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.SignUp = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!email || !name || !password) {
    return next(new ErrorResponse("These fields are required!", 400));
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse("User already exists", 400));
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ name, email, password: hashedPassword });
  if (user) {
    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        name: user.name,
        email: user.email,
        token,
      });
  } else {
    next(new ErrorResponse("User cannot be registered", 401));
  }
});

exports.SignIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new ErrorResponse("These fields are required", 401));
  }
  const user = await User.findOne({ email });
  if (user) {
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (matchedPassword) {
      let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      res
        .cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({
          name: user.name,
          email: user.email,
          token,
        });
    } else {
      next(new ErrorResponse("Invalid Credentials!", 400));
    }
  } else {
    next(new ErrorResponse("Invalid Credentials!", 400));
  }
});

exports.GetMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    next(new ErrorResponse("User not found", 404));
  }
});
