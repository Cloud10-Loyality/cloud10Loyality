import { errorHandler, AppError } from "@cloud10lms/shared";

import express, { Express, Request, Response, NextFunction } from "express";
import { config } from "dotenv";
import nftRoutes from "./routes/nft.routes";
import walletRoutes from "./routes/wallet.routes";
import morgan from "morgan";

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));
app.use("/api/v1/nft", nftRoutes);
app.use("/api/v1/wallet", walletRoutes);

export default app;
