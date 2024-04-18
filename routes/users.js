import express from "express";
import {
  getUser,
  getUsers,
  addMoney,
  addCard,
  deleteUser,
  addOnlyRewards,
  cardPaymentRewads,
  redeemRewards,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// router.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// router.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })

//UPDATE
// router.put("/:id", verifyUser, updateUser);

//DELETE
router.delete("/:id", deleteUser);

//GET
router.get("/:id", getUser);

//GET ALL
router.get("/", getUsers);

// Adding money
router.put("/addmoney/:id", addMoney);
router.put("/addcard/:id", addCard);
router.put("/addrewardsonly", addOnlyRewards);
router.put("/cardpaymentrewards", cardPaymentRewads);
router.put("/redeem", redeemRewards);

export default router;
