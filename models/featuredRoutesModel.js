import mongoose from "mongoose";

const featuredRoutesSchema = mongoose.Schema({
  from: {
    type: String,
    required: [true, "Please input from destination"],
  },
  to: {
    type: String,
    required: [true, "Please input to destination"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the price"],
  },
});

const featuredRoutesModel = mongoose.model("featuredRoutes");
