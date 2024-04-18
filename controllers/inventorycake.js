import Inventorycake from "../models/Inventorycake.js";
import { createError } from "../utils/error.js";
import moment from "moment";

export const createInventorycake = async (req,res,next)=>{
  const {date, ...data}= req.body;
  const apiDate = new Date(date)
    try {
      const inventorycake = await Inventorycake.findOne({ store: req.body.store, dateFormat:req.body.dateFormat });
    if (inventorycake) return next(createError(404, "Already submitted "));
        const inventorycakeDoc = await Inventorycake.create({ ...data, date: apiDate});
        res.json(inventorycakeDoc);
      } catch (e) {
        res.status(422).json(e);
      }
}
export const getDateAllInventorycakes = async (req,res,next)=>{
  const Payload = req.body.store ==='All'?{dateFormat:req.body.dateFormat }:{ dateFormat:req.body.dateFormat, store:req.body.store }
  try {
    const inventorycake = await Inventorycake.find(Payload);
      res.json(inventorycake);
    } catch (e) {
      res.status(422).json(e);
    }
}
export const getCustomInventorycake = async (req,res,next)=>{
  const startDate = new Date(req.body.startdate)
  const endDate = new Date(req.body.enddate)
  const Payload = req.body.store ==='All'?{date: { $gte: startDate, $lte: endDate }, }:{date: { $gte: startDate, $lte: endDate }, store:req.body.store }
    try {
      const inventorycake = await Inventorycake.find(Payload);
        res.json(inventorycake);
      } catch (e) {
        res.status(422).json(e);
      }
  }