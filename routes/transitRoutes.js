import express from "express";
import {
  createTransit,
  getAllTransit,
  getTransit,
  updateTransit,
} from "../controllers/transitController.js";

const router = express.Router();

router.route("/").post(createTransit).get(getAllTransit).put(updateTransit);

export { router as transitRouter };
