import express from "express";
import { pinVerification,  register } from "../controllers/dayUserAuth.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register)
// router.post("/login", login)
router.post("/pin", pinVerification)

export default router