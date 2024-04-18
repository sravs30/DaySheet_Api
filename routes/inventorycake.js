import express from "express";
import {getCustomInventorycake, getDateAllInventorycakes,createInventorycake } from "../controllers/inventorycake.js";

const router = express.Router();

router.post("/inventorycake", createInventorycake)
router.post("/getCustominventory", getCustomInventorycake)
router.post("/getallinventorycakes", getDateAllInventorycakes)
export default router