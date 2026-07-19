import mongoose from "mongoose";

const transitSchema = mongoose.Schema({
  from: {
    type: String,
    required: true,
    enum: ["Skardu", "Gilgit", "Rawalpindi"],
  },
  to: {
    type: String,
    required: true,
    enum: ["Skardu", "Gilgit", "Rawalpindi"],
  },
  totalSeats: {
    type: Number,
    required: true,
    default: 44,
  },
  departure: {
    type: Date,
    required: true,
  },
  arrival: {
    type: Date,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  bookedSeats: {
    type: [Number],
    default: 0,
  },
});

const transitModel = mongoose.model("transit", transitSchema);

export default transitModel;
