const User = require("../models/user.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const { userSchema } = require("../middlewares/validate");
const userService = require("../services/user.service");

const register = async (req, res, next) => {
  try {
    await userSchema.validateAsync({ ...req.body });

    const userExists = await userService.findOne({
      email: req.body.email,
    });
    if (userExists) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        status: false,
        message: "User already exists",
      });
    }
    const user = await userService.create({ ...req.body });
    return res.status(StatusCodes.CREATED).json({
      status: true,
      message: "User created successfully",
      user: { userId: user._id, name: user.name, role: user.role },
    });
  } catch (error) {
    console.log(error);
    if (error.isJoi === true) {
      error.statuscode = StatusCodes.BAD_REQUEST;
      return next(error);
    }
    return res.status(500).json({
      status: false,
      message: "Something went wrong, try again",
    });
    //   // throw new BadRequestError(err);
    //   console.log(err);
    //   throw new BadRequestError(err?.details[0]?.message);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: "Please provide email and password",
    });
  }
  const user = await userService.findOne({ email });
  if (!user) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: "Invalid Credentials",
    });
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: false,
      message: "Invalid Credentials",
    });
  }
  // compare password
  const token = user.createJWT();
  return res.status(StatusCodes.OK).json({
    status: true,
    message: "User logged in successfully",
    user: { userId: user._id, name: user.name, role: user.role },
    token,
  });
};

module.exports = {
  register,
  login,
};
