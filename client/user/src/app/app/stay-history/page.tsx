"use client";

import { BOOKING_COLUMN } from "@/components/constants/booking/booking-coulmns";
import BookingTable from "@/components/booking-table/BookingHistory";
import React from "react";
import { useBooking } from "@/utils/hooks/use-bookings";

type Props = {};

export default function Bookings({}: Props) {
  const { bookings, loading } = useBooking();

  return (
    <>
      <BookingTable column={BOOKING_COLUMN} data={bookings} />
    </>
  );
}
