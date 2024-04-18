import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) return next(createError(404, "User already Exist"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username:req.body.username,
      name:req.body.name,
      email:req.body.email,
      uuid:req.body.uuid,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email!"));

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT
    );
    const { _id, email, amount, rewards, name, uuid } = user._doc;
    res
      .status(200)
      .json({ details: { _id, email, amount, rewards, name, uuid, token}}, );
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
     { $set: { password: hash} },
      { new: true }
    );
    res.status(200).json("Password updated successfully");
  } catch (err) {
    next(err);
  }
};
