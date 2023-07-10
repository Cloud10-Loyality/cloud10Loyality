"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";

import { useProfile } from "@/utils/hooks/use-profile";
import { Bookings, useBooking } from "@/utils/hooks/use-bookings";

type Props = {};

export default function page({}: Props) {
  const { user } = useProfile();
  const { bookings, loading } = useBooking();
  const [totalSpending, setTotalSpending] = useState<number>(0);
  const [avgBookingValue, setAvgBookingValue] = useState<number>(0);
  const [lastCheckIn, setLastCheckIn] = useState<Date | null>(null);

  useEffect(() => {
    if (!loading && bookings.length > 0) {
      const amounts = bookings.map((booking: Bookings) => booking.amount);
      const sum = amounts.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const avgValue = sum / amounts.length;
      const checkInDates = bookings.map(
        (booking: Bookings) => new Date(booking.checkIn)
      );
      const lastCheckInDate = new Date(
        Math.max(...checkInDates.map((date) => date.getTime()))
      );

      setTotalSpending(sum);
      setAvgBookingValue(avgValue);
      setLastCheckIn(lastCheckInDate);
    }
  }, [loading, bookings]);

  return (
    <div className=" font-light h-full">
      <div className="flex flex-row  ml-3">
        <Card className="w-90">
          <CardHeader>
            <h3>Total Spending</h3>
            <CardDescription>{totalSpending}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-md space-y-3">
              <li className="flex place-content-between gap-4 ">
                <h4>Avg Booking Value</h4>
                <span>{avgBookingValue}</span>
              </li>
              <li className="flex place-content-between">
                <h4>Bookings</h4>
                <span>{bookings.length}</span>
              </li>
              <li className="flex place-content-between gap-4">
                <h4>Last booking</h4>
                <span>{lastCheckIn ? lastCheckIn.toDateString() : ""}</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card className="w-80 ml-8">
          <CardHeader>
            <h3>Active Points</h3>
            <CardDescription>{user.points}</CardDescription>
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
            <h3>Current Tier</h3>
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
