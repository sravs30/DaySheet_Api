import express from "express";
import { createintents } from "../controllers/payment.js";

const router = express.Router();

router.post("/intents", createintents)

export default router