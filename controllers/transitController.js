import { createTransitService } from "../services/transitService.js";

export async function createTransit(req, res) {
  try {
    const data = req.body;
    const response = await createTransitService(data);

    res.status(200).json({
      success: "true",
      response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}
export async function getTransit(req, res) {
  try {
  } catch (error) {}
}
