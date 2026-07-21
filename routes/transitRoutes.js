import express from "express";
import {
  createTransit,
  deleteTransit,
  getAllTransit,
  getTransit,
  updateTransit,
} from "../controllers/transitController.js";

const router = express.Router();

router.route("/:id").put(updateTransit).delete(deleteTransit);
router.route("/").post(createTransit).get(getAllTransit);

export { router as transitRouter };
