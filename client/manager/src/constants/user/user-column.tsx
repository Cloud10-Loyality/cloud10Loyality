"use client";

import { ArrowDown, ArrowUp } from "@/components/ui/icons";

import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { User } from "@/libs/hooks/use-user";

export const USER_COLUMN: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.getValue("_id");
      return (
        <Link href={`/app/users/${id}`}>
          <Button variant="link" className="py-0 px-0">
            {id as unknown as React.ReactNode}
          </Button>
        </Link>
      );
    },
  },
  {
    accessorKey: "firstname",
    header: () => <div className="w-max">First Name</div>,
  },
  {
    accessorKey: "lastname",
    header: () => <div className="w-max">Last Name</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <span className="flex items-center gap-2">
          Email
          <ChevronsUpDown
            size={16}
            strokeWidth={1.5}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </span>
      );
    },
  },
  // {
  //   accessorKey: "phone",
  //   header: "Phone",
  //   cell: ({ row }) => {
  //     const phone = row.getValue("phone");
  //     return <div className="w-max">{phone as unknown as React.ReactNode}</div>;
  //   },
  // },
  // {
  //   accessorKey: "dob",
  //   header: () => <div className="w-max">Date of Birth</div>,
  //   cell: ({ row }) => {
  //     const dob = new Date(row.getValue("dob"));
  //     const date = new Intl.DateTimeFormat("en-US").format(
  //       dob as unknown as Date
  //     );
  //     return <div className="w-max">{date}</div>;
  //   },
  // },
  // {
  //   accessorKey: "uid",
  //   header: "UID",
  // },
  // {
  //   accessorKey: "country",
  //   header: "Country",
  //   cell: ({ row }) => {
  //     const country = row.getValue("country");
  //     return (
  //       <div className="w-max">{country as unknown as React.ReactNode}</div>
  //     );
  //   },
  // },
  // {
  //   accessorKey: "city",
  //   header: "City",
  // },
  // {
  //   accessorKey: "zipCode",
  //   header: () => <div className="w-max">Zip Code</div>,
  // },
  // {
  //   accessorKey: "state",
  //   header: "State",
  // },
  // {
  //   accessorKey: "age",
  //   header: "Age",
  // },
  // {
  //   accessorKey: "gender",
  //   header: "Gender",
  // },
];
