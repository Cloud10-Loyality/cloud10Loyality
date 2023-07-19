"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import React, { useEffect, useTransition } from "react";
import { RootState, useSelector } from "@/redux/store";
import { decodeStr, encodeStr } from "@/libs/utils";
import { usePathname, useSearchParams } from "next/navigation";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";
import { ScrollArea } from "../ui/scrollarea";
import { Tier } from "@/app/app/tier/page";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type Props = {
  tiers?: Tier[];
};

const TierCard = ({ tiers }: Props) => {
  const [tierToUpdate, setTierToUpdate] = React.useState<Tier | {}>({});
  const { accessToken, manager } = useSelector(
    (state: RootState) => state.authReducer
  );

  const searchParams = useSearchParams().get("q");
  const pathname = usePathname();
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const q = searchParams && decodeStr(searchParams);
    if (Object.keys(tierToUpdate).length) {
      const encodedString = encodeStr(
        JSON.stringify({ ...q, tier: tierToUpdate })
      );
      router.push(`${pathname}?q=${encodedString}`);
    }
  }, [tierToUpdate]);

  const handleTierDelete = async (type?: string) => {
    const res = await axios.delete(
      `http://cloud10lms.com/api/v1/tier/${manager._id}?type=${type}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const msg = res?.data?.message;

    startTransition(() => {
      router.refresh();
    });

    toast.success(msg);
  };

  return (
    <ScrollArea className="flex flex-col w-1/2 h-[85vh] gap-2 mb-2">
      {!tiers?.length ? (
        <Card>
          <CardHeader>
            <CardTitle>Tiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 items-center justify-between w-full">
              <div className="hidden dark:block">
                <Image
                  src="/assets/no_tier_dark.svg"
                  width={200}
                  height={200}
                  alt="No Tiers"
                />
              </div>
              <div className="block dark:hidden">
                <Image
                  src="/assets/no_tier_light.svg"
                  width={200}
                  height={200}
                  alt="No Tiers"
                />
              </div>
              <h1 className="font-bold">No Tiers</h1>
            </div>
          </CardContent>
        </Card>
      ) : (
        tiers?.map((tier) => {
          return (
            <Card key={tier?._id} className="max-w-full mb-4">
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
              <div className="flex items-center justify-between">
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tier?.rewards?.map((reward, index) => (
                      <Badge key={`reward-${reward}-index`}>{reward}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setTierToUpdate(tier)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleTierDelete(tier?.name.toUpperCase())}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </div>
            </Card>
          );
        })
      )}
    </ScrollArea>
  );
};

export default TierCard;
