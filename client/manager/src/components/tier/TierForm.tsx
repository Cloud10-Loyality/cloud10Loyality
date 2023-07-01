"use client";

import React, { useEffect, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useTier } from "@/libs/hooks/use-tier";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {};

const TierForm = (props: Props) => {
  const [tier, setTier] = React.useState<string>("");
  const [points, setPoints] = React.useState<number>(0);
  const [rewards, setRewards] = React.useState<string>("");
  const [filteredRewards, setFilteredRewards] = React.useState<string[]>([]);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { updateTier } = useTier();

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      if (event.key === "Tab" || event.key === ",") {
        setFilteredRewards([...filteredRewards, rewards]);
        setRewards("");
      }
    });

    return () => {
      document.removeEventListener("keydown", (event) => {
        if (event.key === "Tab" || event.key === ",") {
          setFilteredRewards([...filteredRewards, rewards]);
          setRewards("");
        }
      });
    };
  }, [rewards]);

  const handleRewardsInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setRewards(e.target.value);
  };

  const handleTierUpdate = async () => {
    const data = {
      points,
      rewards: filteredRewards.length ? filteredRewards : [rewards],
    };

    const res = await updateTier(data, tier as any);

    startTransition(() => {
      router.refresh();
    });

    toast.success(res);
  };

  return (
    <div>
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle>Tier Form</CardTitle>
          <CardDescription>Create or update your own Tier</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Tier</Label>
              <Select onValueChange={(value) => setTier(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a tier" />
                  <SelectContent position="popper">
                    <SelectItem value="SILVER">Silver</SelectItem>
                    <SelectItem value="GOLD">Gold</SelectItem>
                    <SelectItem value="PLATINUM">Platinum</SelectItem>
                  </SelectContent>
                </SelectTrigger>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="points">Points</Label>
              <Input
                id="points"
                type="text"
                placeholder="Points"
                value={points}
                onChange={(e) => setPoints(e.target.value as unknown as number)}
              />
              <p className="text-xs text-muted-foreground">
                Points that is required to reach this tier
              </p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="rewards">Rewards</Label>
              <Textarea
                id="rewards"
                placeholder="Rewards"
                value={rewards}
                onChange={handleRewardsInputChange}
              />
              <p className="text-xs text-muted-foreground">
                If you want to add multiple rewards, press tab or comma(,)
              </p>
              <div className="space-x-2">
                {filteredRewards.length > 0 &&
                  filteredRewards.map((reward, index) => (
                    <Badge key={`${index}${reward}`}>
                      {reward}{" "}
                      <Cross1Icon
                        onClick={() => {
                          setFilteredRewards(
                            filteredRewards.filter((r) => r !== reward)
                          );
                        }}
                        className="ml-4 cursor-pointer"
                        height={10}
                        width={10}
                      />
                    </Badge>
                  ))}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button onClick={handleTierUpdate}>Save</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TierForm;
