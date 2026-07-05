import express from "express";
import {
  addFeaturedRoute,
  getAllfeaturedRoutes,
} from "../controllers/featuredRoutesController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router
  .route("/")
  .post(upload.single("image"), addFeaturedRoute)
  .get(getAllfeaturedRoutes);

export { router as featuredRoutesRoute };
