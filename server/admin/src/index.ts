import { AppError, errorHandler, generateRandomString } from "@c10lms/common";
import express, { NextFunction, Request, Response } from "express";

import authRoutes from "./routes/auth.route";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(
//   "/api/v1/reservation/docs",
//   swaggerUi.serve,
//   swaggerUi.setup(swaggerSpec)
// );
app.use("/api/v1/admin/auth", authRoutes);
// app.use("/api/v1/reservation", reservationRoutes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

app.use(errorHandler);

export const PORT = process.env.PORT || 5000;
export const CLIENT_ID = generateRandomString(10);

export default app;
