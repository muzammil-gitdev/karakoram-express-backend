import express from "express";
import {
  createTransit,
  getAllTransit,
  getTransit,
} from "../controllers/transitController.js";

const router = express.Router();

router.route("/").post(createTransit).get(getAllTransit);

export { router as transitRouter };
