import Dayuser from "../models/Dayuser.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  console.log(req.body);
  try {
    const user = await Dayuser.findOne({ pin: req.body.pin });
    if (user) return next(createError(404, "Pin already Exist"));
    

    const newUser = new Dayuser({
      pin:req.body.pin,
      shop: req.body.shop,
      store:req.body.store,
      person:req.body.person,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
// export const login = async (req, res, next) => {
//   try {
//     const user = await Dayuser.findOne({ email: req.body.email });
//     if (!user) return next(createError(404, "User not found!"));

//     const isPasswordCorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!isPasswordCorrect)
//       return next(createError(400, "Wrong password or email!"));
//     const { _id, email, store, persons } = user._doc;
//     res
//       .status(200)
//       .json({ details: { _id, email, store, persons}}, );
//   } catch (err) {
//     next(err);
//   }
// };

export const pinVerification = async (req, res, next) => {
    try {
      const user = await Dayuser.findOne({ pin: req.body.pin });
      if (!user) return next(createError(404, "User not found!"));
  
      const { store, person, pin , shop} = user._doc;
      res
      .status(200)
      .json({ details: { store, person,shop}}, );
    }
    catch(err){
        next(err);
    }
  };

