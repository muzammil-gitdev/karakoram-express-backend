import bookingModel from "../models/bookingModel.js";

export async function createBookingService(data) {
  return await bookingModel.create(data);
}
