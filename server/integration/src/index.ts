import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import integrationRoutes from "./routes/integration.routes";
import morgan from "morgan";
import { NextFunction, Request, Response } from "express";
import {
  generateRandomString,
  errorHandler,
  AppError,
} from "@cloud10lms/shared";
import { env } from "./env";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/integration", integrationRoutes);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

app.use(errorHandler);

export const PORT = env.INTEGRATION_PORT;
export const CLIENT_ID = generateRandomString(10);

export default app;
