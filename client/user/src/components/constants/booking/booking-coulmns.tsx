"use client";

import { ArrowDown, ArrowUp } from "@/components/ui/icons";

import { ColumnDef } from "@tanstack/react-table";
import { Bookings } from "@/utils/hooks/use-bookings";
import { ChevronsUpDown } from "lucide-react";

export const BOOKING_COLUMN: ColumnDef<Bookings>[] = [
  {
    accessorKey: "hotelName",
    header: () => <div className="">Hotel Name</div>,
    cell: ({ row }) => {
      const hotelName = row.getValue("hotelName");

      return <div className="">{hotelName as unknown as React.ReactNode}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="">Amount</div>,
  },
  {
    accessorKey: "checkIn",
    header: () => <div className="">Check In</div>,
    cell: ({ row }) => {
      const checkIn = new Date(row.getValue("checkIn"));
      const date = new Intl.DateTimeFormat("en-US").format(
        checkIn as unknown as Date
      );
      return <div className="">{date}</div>;
    },
  },
  {
    accessorKey: "checkOut",
    header: () => <div className="">Check Out</div>,
    cell: ({ row }) => {
      const checkOut = new Date(row.getValue("checkOut"));
      const date = new Intl.DateTimeFormat("en-US").format(
        checkOut as unknown as Date
      );
      return <div className="">{date}</div>;
    },
  },
  {
    accessorKey: "city",
    header: () => <div className="">City</div>,
  },
  {
    accessorKey: "paymentMethod",
    header: () => <div className="">Payment Method</div>,
  },
  {
    accessorKey: "zipCode",
    header: () => <div className="">Pin</div>,
  },
];
