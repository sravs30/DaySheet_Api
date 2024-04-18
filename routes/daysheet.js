import express from "express";
import { findYesterdayAllDaysheet, getAllLocationsDaysheets,createDaysheet, findYesterdayDaysheet, getAllDaysheets, updateDaysheetVerification, getLast7Daysheet } from "../controllers/daysheet.js";

const router = express.Router();

router.post("/daysheets", createDaysheet)
router.get("/daysheets", getAllDaysheets)
router.post("/yesterdayDaySheet", findYesterdayDaysheet)
router.post("/verification", updateDaysheetVerification)
router.post("/lastdaysheets", getLast7Daysheet)
router.post("/allocations", getAllLocationsDaysheets)
router.post("/yesterdayAllDaySheets", findYesterdayAllDaysheet)
export default router