import { createBookingService } from "../services/bookingService.js";

export async function createBooking(req, res) {
  try {
    console.log(req.body);
    const response = await createBookingService(req.body);
    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      err: error.message,
    });
  }
}
