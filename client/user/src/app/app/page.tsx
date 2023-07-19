import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";

type Props = {};

export default function page({}: Props) {
  return (
    <div className=" font-light h-full">
      <div className="flex flex-row  ml-3">
        <Card className="w-90">
          <CardHeader>
            <CardTitle>Total Spending</CardTitle>
            <CardDescription>{"totalSpending"}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-md space-y-3">
              <li className="flex place-content-between gap-4 ">
                <h4>Avg Booking Value</h4>
                <span>{""}</span>
              </li>
              <li className="flex place-content-between">
                <h4>Bookings</h4>
                <span>{""}</span>
              </li>
              <li className="flex place-content-between gap-4">
                <h4>Last booking</h4>
                <span>{""}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="w-80 ml-8">
          <CardHeader>
            <CardTitle>Active Points</CardTitle>
            <CardDescription>{"points"}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-md space-y-3">
              <li className="flex place-content-between gap-4 ">
                <h4>Pending point</h4>
                <span>0</span>
              </li>
              <li className="flex place-content-between">
                <h4>Used points</h4>
                <span>0</span>
              </li>
              <li className="flex place-content-between">
                <h4>Expired points</h4>
                <span>0</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="w-80 ml-8">
          <CardHeader>
            <CardTitle>Current Tier</CardTitle>
            <CardDescription>Silver</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-md space-y-3">
              <li className="flex place-content-between gap-4 ">
                <h4>Points to the next tier</h4>
                <span>21</span>
              </li>
              <li className="flex place-content-between">
                <h4>Tier promotion date</h4>
                <span>20 aug 2024</span>
              </li>
              <li className="flex place-content-between">
                <h4>Tier reset date</h4>
                <span>19 jan 2024</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
