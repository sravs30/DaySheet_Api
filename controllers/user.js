import User from "../models/User.js";
import { createError } from "../utils/error.js";

// export const updateUser = async (req,res,next)=>{
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       { $set: req.body },
//       { new: true }
//     );
//     res.status(200).json(updatedUser);
//   } catch (err) {
//     next(err);
//   }
// }
export const getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({user});
  } catch (err) {
    next(err);
  }
}
export const getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
}
export const addMoney = async (req,res,next)=>{
  
  try {
    const  valueToAdd  = req.body;
    let transIdList=[];
  transIdList.push({
    transId:valueToAdd.transIds,
    amount: valueToAdd.amount
})
const reward = valueToAdd.amount * 1;
console.log('TransactionIds', transIdList,reward);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { 
      $push: { transIds: transIdList}, 
      $inc: { amount: valueToAdd.amount ,rewards: reward},  },
    //  { $inc: { amount: valueToAdd.amount } },
    //  { $push: { transIds: transIdList} },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const addCard = async (req,res,next)=>{
  let card=[];
  card.push({
    cardNum: req.body.cardNum,
    expiryDate: req.body.expiryDate,
    CVV: req.body.CVV,
})
  try {
    const user = await User.findById( req.params.id );
    
    const cardData = user.cards;
    console.log(cardData, );
    const duplicateCards =  user.cards.find((element) => element.cardNum == req.body.cardNum);
    if (duplicateCards) return next(createError(404, "This card already added"));
    console.log('duplicateCards entry', duplicateCards);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
     { $push: { cards: card} },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}

export const deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}

export const addOnlyRewards = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      { 
      $inc: { rewards: req.body.rewards},  },
      { new: true }
    );
    res.status(200).json({user:updatedUser});
  } catch (err) {
    next(err);
  }
}
export const cardPaymentRewads = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      { 
      $inc: { rewards: req.body.rewards,amount: -req.body.amount},  },
     
      { new: true }
    );
    res.status(200).json({user:updatedUser});
  } catch (err) {
    next(err);
  }
}
export const redeemRewards = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.body.id,
      { 
      $inc: { rewards: -req.body.rewards},  },
     
      { new: true }
    );
    res.status(200).json({user:updatedUser});
  } catch (err) {
    next(err);
  }
}