import {
  AppError,
  errorHandler,
  generateRandomString,
} from "@c10lms/common";
import { NextFunction, Request, Response } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import managerRoutes from "./routes/manager.routes";
import morgan from "morgan";
import reservationRoutes from "./routes/reservation.routes";
import userRoutes from "./routes/user.routes";

// import integrationRoutes from "./routes/integration.routes";

export const PORT = process.env.MANAGER_PORT || 7000;
export const CLIENT_ID = generateRandomString(10);

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/manager/reservation", reservationRoutes);
app.use("/api/v1/manager/user", userRoutes);
app.use("/api/v1/manager", managerRoutes);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

app.use(errorHandler);

export default app;
