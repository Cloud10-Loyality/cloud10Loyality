import { Types } from "mongoose";
export type TierType = {
  name?: string;
  minSpend?: number;
  rewards?: string[];
  manager?: Types.ObjectId;
  users?: [
    {
      email?: string;
    }
  ];
};

export type TierName = "GOLD" | "SILVER" | "PLATINUM";