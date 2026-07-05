import featuredRoutesModel from "../models/featuredRoutesModel.js";
export async function addFeaturedRoute(req, res) {
  try {
    console.log(req.file);
    if (!req.file)
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    const data = {
      ...req.body,
      image: req.file.path,
    };
    res.status(201).json({
      success: true,
      message: "Featured Route Added Successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
