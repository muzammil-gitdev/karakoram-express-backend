import express from "express";
import { createTransit } from "../controllers/transitController.js";

const router = express.Router();

router.route("/").post(createTransit);

export { router as transitRouter };
