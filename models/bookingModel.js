import mongoose from "mongoose";

const bookingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 40,
  },
  cnicNo: {
    type: String,
    required: true,
    maxLength: 13,
  },
  phoneNo: {
    type: String,
    required: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  datOfBooking: {
    type: Date,
    default: Date.now(),
  },
  transitDat: {
    type: Date,
    required: true,
  },
  seatsBooked: {
    type: [Number],
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  noOfSeatsBooked: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  to: {
    type: String,
    required: true,
    enum: ["Rawalpindi", "Skardu", "Gilgit", "Gahkuch"],
  },
  from: {
    type: String,
    required: true,
    enum: ["Rawalpindi", "Skardu", "Gilgit", "Gahkuch"],
  },
  status: {
    type: String,
    default: "pending",
  },
});

const bookingModel = mongoose.model("booking", bookingSchema);

export default bookingModel;
