"use client";

import { RootState, useSelector } from "@/redux/store";
import axios from "axios";

export interface RootObject {
  data: Data;
  error: boolean;
  status: string;
  totalResults: number;
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
  const { accessToken, manager } = useSelector(
    (state: RootState) => state.authReducer
  );
  const getTiers = async (): Promise<Tier[]> => {
    const res = await axios.get<RootObject>(
      `http://cloud10lms.com/api/v1/tier/${manager?._id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data.data.tiers;
    };
    
    const updateTier = async () => {
        
    }

  return { getTiers };
};
