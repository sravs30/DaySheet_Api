import Adminuser from "../models/AdminUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const admin = await Adminuser.findOne({ username: req.body.username });
    if (admin) return next(createError(404, "User already Exist"));
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new Adminuser({
      username:req.body.username,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("Admin has been created.");
  } catch (err) {
    next(err);
  }
};
export const login = async (req, res, next) => {
  try {
    const admin = await Adminuser.findOne({ username: req.body.username });
    if (!admin) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      admin.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or email!"));

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT
    );
    const { _id, username } = admin._doc;
    res
      .status(200)
      .json({ details: { _id, username}}, );
  } catch (err) {
    next(err);
  }
};


