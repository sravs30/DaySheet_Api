import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    pin: {
      type: Number,
      required: true,
      unique:true
    },
    store:{
      type: String,
      required: true,
    },
    person:{
      type: String,
    },
    shop:{
      type: String,
      required: true,
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("Dayuser", UserSchema);
