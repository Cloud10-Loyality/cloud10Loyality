import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Image from "next/image";
import React from "react";
import axios from "axios";
import { decodeStr } from "@/utils";

export interface Root {
  status: string;
  error: boolean;
  totalResults: number;
  data: Data;
}

export interface Data {
  tiers: Tier[];
}

export interface Tier {
  _id: string;
  email: string;
  points: number;
  manager: Manager;
  tier?: string;
  __v: number;
}

type Manager = {
  _id: string;
  email: string;
  name: string;
};

type Props = {
  searchParams: any;
};

const getTiers = async (accessToken: string) => {
  try {
    const res = await axios.get<Root>(
      "http://cloud10lms.com/api/v1/user/tier/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data.data.tiers;
  } catch (err) {
    console.log(err);
  }
};

const Page = async (props: Props) => {
  let q = props?.searchParams["q"];

  q = (q && decodeStr(q)) as any;

  const tiers = await getTiers(q?.accessToken);

  const tier_logo = (tier?: "Silver" | "Gold" | "Platinum") => {
    switch (tier) {
      case "Silver":
        return "/assets/silver-medal.png";
      case "Gold":
        return "/assets/gold-medal.png";
      case "Platinum":
        return "/assets/platinum-medal.png";
      default:
        return "";
    }
  };

  return (
    <>
      <div>
        <CardTitle className="text-foreground mb-4">Points</CardTitle>
        <div className="flex gap-2">
          {tiers?.map((tier) => (
            <Card key={tier?._id}>
              <CardHeader>
                <CardTitle>{tier?.manager?.name}</CardTitle>
                <CardDescription>{tier?.manager?.email}</CardDescription>
              </CardHeader>
              <div className="flex items-center justify-between">
                <CardHeader>
                  <CardTitle>
                    <h1>
                      {tier?.points} {tier?.points > 1 ? "Points" : "Point"}
                    </h1>
                  </CardTitle>
                </CardHeader>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {tier?.tier ? tier?.tier : "No Tier"}
                    {tier?.tier && (
                      <span>
                        <Image
                          src={tier_logo(
                            tier?.tier as unknown as
                              | "Silver"
                              | "Gold"
                              | "Platinum"
                          )}
                          height={24}
                          width={24}
                          alt="Tier Logo"
                        />
                      </span>
                    )}
                  </CardTitle>
                  <CardDescription>
                    {tier?.tier
                      ? `You'r in the ${tier?.tier} tier`
                      : "You'r not in any tier yet"}
                  </CardDescription>
                </CardHeader>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page;
