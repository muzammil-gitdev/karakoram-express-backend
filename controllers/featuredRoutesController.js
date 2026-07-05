import { addFeatureRouteService } from "../services/featuredRoutesServices.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export async function addFeaturedRoute(req, res) {
  try {
    if (!req.file) {
      //checks if there is a file if not it throws an error
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const cloudinaryRes = await uploadOnCloudinary(req.file.path); //upload the image to cloudinary

    if (!cloudinaryRes) {
      res.status(500).jsons({
        success: false,
        message: "Failed to upload image",
      });
    }

    const data = {
      ...req.body,
      image: cloudinaryRes.secure_url,
      publicId: cloudinaryRes.public_id,
    };
    const response = await addFeatureRouteService(data);

    res.status(201).json({
      success: true,
      message: "Featured Route Added Successfully",
      response,
    });
  } catch (error) {
    res.status(505).json({
      success: false,
      message: error.message,
    });
  }
}
