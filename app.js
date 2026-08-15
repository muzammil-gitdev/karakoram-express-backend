import express from "express";
import cors from "cors";
import { featuredRoutesRoute } from "./routes/featuredRoutesRoute.js";
import { transitRouter } from "./routes/transitRoutes.js";
import { bookingRouter } from "./routes/bookingRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { passengerRouter } from "./routes/passengersRoute.js";
export const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/featuredRoutes", featuredRoutesRoute);
app.use("/api/transit", transitRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/auth", authRouter);
app.use("/api/passengers", passengerRouter);
