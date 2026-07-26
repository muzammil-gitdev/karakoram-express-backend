import bookingModel from "../models/bookingModel.js";
import transitModel from "../models/trasitModel.js";

export async function createBookingService(data, session) {
  return await bookingModel.create([data], { session });
}
export async function findAndUpdateService(
  find_to,
  find_from,
  find_transitDat,
  find_vehicleNo,
  attach_seatsBooked,
  session,
) {
  return await transitModel.findOneAndUpdate(
    {
      to: find_to,
      from: find_from,
      departure: find_transitDat,
      vehicleNumber: find_vehicleNo,
      seatsBooked: { $nin: attach_seatsBooked },
    },
    { $push: { bookedSeats: { $each: attach_seatsBooked } } },
    {
      returnDocument: "after",
      runValidators: true,
      session,
    },
  );
}
