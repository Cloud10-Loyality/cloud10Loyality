import morgan from "morgan";
import express, { Express, Request, Response, NextFunction } from "express";
import { config } from "dotenv";

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

export default app;
