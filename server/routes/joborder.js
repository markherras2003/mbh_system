import express from "express";
import {
  getJobOrder,getJobOrders,saveJobOrder
} from "../controllers/joborder.js";
//import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*  Get List of job order per ID with jwt verify token */
router.get("/:id", getJobOrder);
router.post("/", saveJobOrder);
router.get("/",getJobOrders)

export default router;
