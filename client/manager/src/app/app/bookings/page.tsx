import { BOOKING_COLUMN } from "@/constants/table-columns";
import BookingTable from "@/components/booking/BookingTable";
import React from "react";
import { useBooking } from "@/libs/hooks/use-bookings";

type Props = {};

export default async function Bookings({}: Props) {
  const res = await useBooking();

  return (
    <div>
      <BookingTable column={BOOKING_COLUMN} data={res} />
    </div>
  );
}
