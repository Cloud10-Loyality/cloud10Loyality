import { Types } from "mongoose";

export type TierType = {
  name?: string;
  points?: number;
  rewards?: string[];
  manager?: Types.ObjectId;
};

export type TierName = "GOLD" | "SILVER" | "PLATINUM";
