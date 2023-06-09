import { errorHandler, AppError } from "@cloud10lms/shared";

import express, { Express, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import nftRoutes from "./routes/nft.routes";
import walletRoutes from "./routes/wallet.routes";
import morgan from "morgan";
import cors from "cors";

const app = express();
config();
app.use(morgan("dev"));
  cors({
    origin: "*",
  })
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use("/api/v1/nft", nftRoutes);
app.use("/api/v1/wallet", walletRoutes);

export default app;
