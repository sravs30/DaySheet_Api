import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    uuid: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    amount:{
      type: Number,
      default:0
    },
    rewards:{
      type: Number,
      default:0
    },
    transIds:[
      {transId: String,
       amount: Number}
    ],
    cards:[{
      cardNum:Number,
      expiryDate:String,
      CVV:Number
    }]
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
