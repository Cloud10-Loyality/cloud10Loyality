"use client";

import { ChevronsUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Reservation } from "@/libs/hooks/use-bookings";

export const USER_BOOKING_COLUMN: ColumnDef<Reservation>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
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
    accessorKey: "managerId",
    header: () => <div className="w-max">Manager ID</div>,
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
    header: "City",
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div className="w-max">Payment Method</div>,
  },
  {
    accessorKey: "pin",
    header: "Pin",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="w-max">Created At</div>,
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      const date = new Intl.DateTimeFormat("en-US").format(
        createdAt as unknown as Date
      );
      return <div className="w-max">{date}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="w-max">Updated At</div>,
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updatedAt"));
      const date = new Intl.DateTimeFormat("en-US").format(
        updatedAt as unknown as Date
      );
      return <div className="w-max">{date}</div>;
    },
  },
];
