import express from "express";
import {
  getJobOrder,getJobOrders,saveJobOrder,updateJobOrder
} from "../controllers/joborder.js";
//import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*  Get List of job order per ID with jwt verify token */
router.get("/:_id", getJobOrder);
router.post("/", saveJobOrder);
router.get("/",getJobOrders)
router.put('/:_id', updateJobOrder);

export default router;
