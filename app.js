import express from "express";
import cors from "cors";
import { featuredRoutesRoute } from "./routes/featuredRoutesRoute.js";
import { transitRouter } from "./routes/transitRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";

export const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/featuredRoutes", featuredRoutesRoute);
app.use("/api/transit", transitRouter);
app.use("/api/booking", bookingRouter);
