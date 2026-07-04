import "./config.js";
import { app } from "./app.js";
import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL).then((con) => {
  console.log("Database Connected Successfully ✅");
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log("Running on PORT = ", process.env.PORT);
});
