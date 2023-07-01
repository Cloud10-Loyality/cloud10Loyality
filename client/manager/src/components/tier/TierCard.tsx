"use client";

import { Tier, useTier } from "@/libs/hooks/use-tier";
import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";

type Props = {};

const TierCard = (props: Props) => {
  const [tiers, setTiers] = React.useState<Tier[]>([]);
  const { getTiers } = useTier();

  useEffect(() => {
    let isMounted = true;
    isMounted && getTiers().then((res) => setTiers(res));

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col w-1/2 gap-2 mb-2">
      {tiers.map((tier) => {
        return (
          <Card className="max-w-full">
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
                {tier?.rewards?.map((reward) => (
                  <Badge>{reward}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default TierCard;
