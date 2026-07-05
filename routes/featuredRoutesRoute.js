import express from "express";
import { addFeaturedRoute } from "../controllers/featuredRoutesController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.route("/").post(upload.single("image"), addFeaturedRoute);

export { router as featuredRoutesRoute };
