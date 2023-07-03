"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import React, { useEffect } from "react";

import { Badge } from "../ui/badge";
import { Tier } from "@/app/app/tier/page";

type Props = {
  tiers?: Tier[];
};

const TierCard = ({ tiers }: Props) => {
  return (
    <div className="flex flex-col w-1/2 gap-2 mb-2">
      {!tiers?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Tiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between w-full">
              <h1 className="text-2xl">No Tiers</h1>
            </div>
          </CardContent>
        </Card>
      ) : (
        tiers?.map((tier) => {
          return (
            <Card key={tier?._id} className="max-w-full">
              <div className="flex items-center justify-between">
                <CardHeader>
                  <CardTitle>{tier?.name}</CardTitle>
                  <CardDescription>{tier?.name} Tier</CardDescription>
                </CardHeader>
                <CardHeader>
                  <CardTitle className="text-2xl">{tier?.points}</CardTitle>
                  <CardDescription>Points</CardDescription>
                </CardHeader>
              </div>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {tier?.rewards?.map((reward, index) => (
                    <Badge key={`reward-${reward}-index`}>{reward}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default TierCard;
