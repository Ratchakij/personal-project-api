const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AppError = require("../utils/appError");
const { User } = require("../models");

const genToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET_KEY || "private_key", {
    expiresIn: process.env.JWT_EXPIRES || "1d",
  });

exports.register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, mobile, password, confirmPassword } =
      req.body;

    if (!email && !mobile) {
      throw new AppError("Email & Mobile required", 400);
    }

    if (!password) {
      throw new AppError("Password required", 400);
    }

    if (password !== confirmPassword) {
      throw new AppError("Password and confirm password did not match", 400);
    }

    const isEmail = validator.isEmail(email + "");
    const isMobile = validator.isMobilePhone(mobile + "", "th-TH");

    if (!isEmail || !isMobile || isMobile === false) {
      throw new AppError("Email or Mobile is invalid", 400);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPassword,
    });

    const token = genToken({
      id: user.id,
    });
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
      throw new AppError("Email or Password is invalid", 400);
    }

    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new AppError("Email/Password is invalid", 400);
    }

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) {
      throw new AppError("Email/Password is invalid", 400);
    }
    const token = genToken({ id: user.id });
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};
