import { NextFunction, Request, Response } from "express";

import { AppError } from "@cloud10lms/shared/build/utils/appError";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "@cloud10lms/shared/build/middleware/error.handler";
import express from "express";
import morgan from "morgan";
import reservationRoutes from "./routes/reservation.routes";

export const PORT = process.env.GATEWAY_1_PORT || 5000;

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

app.use("/api/v1/reservations", reservationRoutes);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

app.use(errorHandler);

export default app;
