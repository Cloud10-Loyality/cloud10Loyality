"use client";

import { ArrowDown, ArrowUp } from "@/components/ui/icons";

import { ColumnDef } from "@tanstack/react-table";
import { Bookings } from "@/utils/hooks/use-bookings";
import { ChevronsUpDown } from "lucide-react";

export const BOOKING_COLUMN: ColumnDef<Bookings>[] = [
  {
    accessorKey: "hotelName",
    header: () => <div className="w-max">Hotel Name</div>,
    cell: ({ row }) => {
      const hotelName = row.getValue("hotelName");

      return (
        <div className="w-max whitespace-nowrap">
          {hotelName as unknown as React.ReactNode}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="w-max">Amount</div>,
  },
  {
    accessorKey: "checkIn",
    header: () => <div className="w-max">Check In</div>,
    cell: ({ row }) => {
      const checkIn = new Date(row.getValue("checkIn"));
      const date = new Intl.DateTimeFormat("en-US").format(
        checkIn as unknown as Date
      );
      return <div className="w-max">{date}</div>;
    },
  },
  {
    accessorKey: "checkOut",
    header: () => <div className="w-max">Check Out</div>,
    cell: ({ row }) => {
      const checkOut = new Date(row.getValue("checkOut"));
      const date = new Intl.DateTimeFormat("en-US").format(
        checkOut as unknown as Date
      );
      return <div className="w-max">{date}</div>;
    },
  },
  {
    accessorKey: "city",
    header: () => <div className="w-max">City</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div className="w-max">Payment Method</div>,
  },
  {
    accessorKey: 'zipCode',
    header: () => <div className="w-max">Pin</div>,
  },
];
