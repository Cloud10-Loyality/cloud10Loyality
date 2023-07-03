import { TierCard, TierForm } from "@/components/tier";

import { ManagerType } from "../../../../types";
import { NextPage } from "next";
import React from "react";
import axios from "axios";
import { decodeStr } from "@/libs/utils";

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

const getTiers = async (
  accessToken: string,
  manager: ManagerType
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

export default async function Page(props) {
  let q = props?.searchParams["q"];

  q = q && decodeStr(q);

  const res = q && (await getTiers(q?.accessToken, q?.manager));
  console.log(res);
  return (
    <div className="flex gap-2">
      <TierCard tiers={res} />
      <TierForm tiers={res} />
    </div>
  );
}
