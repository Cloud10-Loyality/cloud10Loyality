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

export const PORT = process.env.GATEWAY_1_PORT || 6000;

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

app.use("/api/v1/integrations", integrationRoutes);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  console.log(req, "Request---");
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

export const CLIENT_ID = generateRandomString(10);
app.use(errorHandler);

export default app;
