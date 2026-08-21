import { Router } from "express";
import { transitPayment } from "../controllers/paymentController.js";

export const paymentRouter = Router();

paymentRouter.post("/", transitPayment);
