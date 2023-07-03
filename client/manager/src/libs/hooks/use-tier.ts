"use client";

import { RootState, useSelector } from "@/redux/store";

import { Manager } from "./use-manager";
import axios from "axios";

export interface RootObject {
  data?: Data;
  error?: boolean;
  status?: string;
  totalResults?: number;
  message?: string;
}

export interface Data {
  tiers: Tier[];
}

export interface Tier {
  __v: number;
  _id: string;
  manager: string;
  name: string;
  points: number;
  rewards: string[];
}

export const useTier = () => {
  // const { accessToken, manager } = useSelector(
  //   (state: RootState) => state.authReducer
  // );
  const getTiers = async (
    accessToken: string,
    manager: Manager
  ): Promise<Tier[]> => {
    const res = await axios.get<RootObject>(
      `http://cloud10lms.com/api/v1/tier/${manager?._id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data.data!.tiers;
  };

  const updateTier = async (
    manager: Manager,
    accessToken: string,
    body: Partial<Tier>,
    type?: "SILVER" | "GOLD" | "PLATINUM"
  ) => {
    const res = await axios.patch<RootObject>(
      `http://cloud10lms.com/api/v1/tier/${manager?._id}?type=${type}`,
      { ...body },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data.message;
  };

  return { getTiers, updateTier };
};
