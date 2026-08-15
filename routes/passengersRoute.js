import { Router } from "express";
import { getPassengers } from "../controllers/passegerController.js";

export const passengerRouter = Router();

passengerRouter.get("/getPassengers", getPassengers);
