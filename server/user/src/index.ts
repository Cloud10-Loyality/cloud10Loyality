import {
  AppError,
  errorHandler,
  generateRandomString,
} from "@cloud10lms/shared";
import { NextFunction, Request, Response } from "express";

import authRoutes from "./routes/auth.routes";
import bookingRoutes from "./routes/booking.routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import userRoutes from "./routes/user.routes";

export const PORT = process.env.USER_PORT || 8000;
export const CLIENT_ID = generateRandomString(10);

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user/auth", authRoutes);
app.use("/api/v1/user/bookings", bookingRoutes);
app.use("/api/v1/user", userRoutes);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} path on the server`, 404)
  );
});

app.use(errorHandler);

export default app;
