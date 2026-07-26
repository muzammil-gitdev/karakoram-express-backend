import mongoose, { mongo } from "mongoose";
import {
  createBookingService,
  findAndUpdateService,
} from "../services/bookingService.js";

export async function createBooking(req, res) {
  const session = await mongoose.startSession();
  const { to, from, transitDat, vehicleNo, seatsBooked } = req.body;
  try {
    session.startTransaction();
    const bookingResponse = await createBookingService(req.body, session);
    const updateTransitResponse = await findAndUpdateService(
      to,
      from,
      transitDat,
      vehicleNo,
      seatsBooked,
      session,
    );
    console.log(updateTransitResponse);
    if (!updateTransitResponse) {
      throw new Error("Seat Already Booked");
    }
    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: "Data Submitted Successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      success: false,
      err: error.message,
    });
  } finally {
    session.endSession();
  }
}
