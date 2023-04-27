import express from "express";
import {
  getJobOrder,
  getJobOrders,
  saveJobOrder,
  updateJobOrder,
  deleteJobOrder
} from "../controllers/joborder.js";
//import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*  Get List of job order per ID with jwt verify token */
router.get("/:_id", getJobOrder);
router.get("/",getJobOrders)
router.post("/", saveJobOrder);
router.put('/:_id', updateJobOrder);
router.delete('/:_id', deleteJobOrder);

export default router;
