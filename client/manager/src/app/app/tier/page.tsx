import { TierCard, TierForm } from "@/components/tier";
import { useTier } from "@/libs/hooks/use-tier";
import { store } from "@/redux/store";
import React from "react";

type Props = {};

export default async function Page({}: Props) {
  return (
    <div className="flex gap-2">
      <TierCard />
      <TierForm />
    </div>
  );
}
