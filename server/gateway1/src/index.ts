import {
  AppError,
  errorHandler,
  generateRandomString,
} from "@c10lms/common";
import { NextFunction, Request, Response } from "express";

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import reservationRoutes from "./routes/reservation.routes";
import { swaggerSpec } from "./utils/swaggerSpec";
import swaggerUi from "swagger-ui-express";
import userRoutes from "./routes/user.routes";

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

app.use(
  "/api/v1/reservation/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
app.use("/api/v1/reservation/user", userRoutes);
app.use("/api/v1/reservation", reservationRoutes);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

app.use(errorHandler);

export const CLIENT_ID = generateRandomString(10);
export default app;
