import { AppError, errorHandler, generateRandomString } from "@c10lms/common";
import express, { Express, NextFunction, Request, Response } from "express";

import { config } from "dotenv";
import cors from "cors";
import morgan from "morgan";
import nftRoutes from "./routes/nft.routes";
import userRoutes from "./routes/user.routes";
import walletRoutes from "./routes/wallet.routes";

export const CLIENT_ID = generateRandomString(10);

const app = express();
config();
app.use(morgan("dev"));
cors({
  origin: "*",
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/v1/nft", nftRoutes);
app.use("/api/v1/wallet/user", userRoutes);
app.use("/api/v1/wallet", walletRoutes);

app.all("*", (req: Request, _res: Response, next: NextFunction) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} path on the server`, 404)
  );
});

app.use(errorHandler);

export default app;
