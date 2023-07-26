"use client";

// import { ArrowDown, ArrowUp } from "@/components/ui/icons";

import { ColumnDef } from "@tanstack/react-table";
import { Integration } from "@/libs/hooks/use-integration";
import { ChevronsUpDown } from "lucide-react";

export const INTEGRATION_COLUMN: ColumnDef<Integration>[] = [
  {
    accessorKey: "id",
    header: () => <div className="">Hotel Name</div>,
    cell: ({ row }) => {
      const id = row.getValue("id");

      return <div className="">{id as unknown as React.ReactNode}</div>;
    },
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="">Check In</div>,
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("createdAt"));
      const date = new Intl.DateTimeFormat("en-US").format(
        createdAt as unknown as Date
      );
      return <div className="">{date}</div>;
    },
  },
  {
    accessorKey: "email",
    header: () => <div className="">email</div>,
  },
  {
    accessorKey: "name",
    header: () => <div className="">name</div>,
  },

  {
    accessorKey: "role",
    header: () => <div className="">role</div>,
  },
];
