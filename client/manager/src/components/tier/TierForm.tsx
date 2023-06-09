"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Cross1Icon, ReloadIcon } from "@radix-ui/react-icons";
import React, {
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { RootState, useSelector } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useRouter, useSearchParams } from "next/navigation";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Link from "next/link";
import { ManagerType } from "../../../types";
import { Textarea } from "../ui/textarea";
import { Tier } from "@/app/app/tier/page";
import axios from "axios";
import { decodeStr } from "@/libs/utils";
import { toast } from "react-toastify";
import { useTier } from "@/libs/hooks/use-tier";

type Props = {
  tiers?: Tier[];
};

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

const TierForm = ({ tiers }: Props) => {
  const [tier, setTier] = useState<string>("");
  const [points, setPoints] = useState<number>(0);
  const [rewards, setRewards] = useState<string>("");
  const [filteredRewards, setFilteredRewards] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [updateMode, setUpdateMode] = useState<boolean>(false);

  const { accessToken, manager } = useSelector(
    (state: RootState) => state.authReducer
  );

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const searchParams = useSearchParams().get("q");

  useEffect(() => {
    if (searchParams) {
      const q = searchParams && decodeStr(searchParams);

      if (q?.tier) {
        setTier(q?.tier?.name.toUpperCase());
        setPoints(q?.tier?.points);
        setFilteredRewards(q?.tier?.rewards);
        setUpdateMode(true);
      }
    }
  }, [searchParams]);

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

  const handleTierModification = async () => {
    const data = {
      points,
      rewards: filteredRewards.length ? filteredRewards : [rewards],
    };

    setLoading(true);

    let res;

    if (updateMode) {
      res = await updateTier(manager, accessToken, data, tier as any);
    } else {
      res = await createTier(manager, accessToken, data, tier as any);
    }

    setTier("");
    setPoints(0);
    setRewards("");
    setFilteredRewards([]);
    setUpdateMode(false);

    startTransition(() => {
      router.refresh();
      setLoading(false);
    });

    toast.success(res);
  };

  async function updateTier(
    manager: ManagerType,
    accessToken: string,
    body: Partial<Tier>,
    type?: "SILVER" | "GOLD" | "PLATINUM"
  ) {
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
  }

  async function createTier(
    manager: ManagerType,
    accessToken: string,
    body: Partial<Tier>,
    type?: "SILVER" | "GOLD" | "PLATINUM"
  ) {
    const res = await axios.post<RootObject>(
      `http://cloud10lms.com/api/v1/tier?type=${type}`,
      { ...body, manager: manager?._id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return res.data.message;
  }

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
              <Select value={tier} onValueChange={(value) => setTier(value)}>
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
          <Button onClick={handleTierModification}>
            {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            {updateMode ? "Update" : "Create"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TierForm;
