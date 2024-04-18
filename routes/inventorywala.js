import express from "express";
import {getCustomInventorywala, getDateAllInventorywalas,createInventorywala  } from "../controllers/inventorywala.js";

const router = express.Router();

router.post("/inventorywala", createInventorywala)
router.post("/getCustominventory", getCustomInventorywala)
router.post("/getallinventorywalas", getDateAllInventorywalas)
export default router