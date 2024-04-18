import express from "express";
import { forgotPassword, login, register } from "../controllers/auth.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.get("/protected", verifyToken)
router.put("/forgotpw", forgotPassword)

export default router