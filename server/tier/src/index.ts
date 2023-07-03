import { AppError, errorHandler, generateRandomString } from "@c10lms/common";
import { NextFunction, Request, Response } from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import tierRoute from "./routes/tier.route";

export const PORT = process.env.TIER_PORT || 9000;
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

app.use("/api/v1/tier", tierRoute);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} path on the server`, 404));
});

app.use(errorHandler);

export default app;
