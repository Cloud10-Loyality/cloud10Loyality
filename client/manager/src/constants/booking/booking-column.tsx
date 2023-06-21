"use client";

import { ArrowDown, ArrowUp } from "@/components/ui/icons";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/libs/hooks/use-user";

export const BOOKING_COLUMN: ColumnDef<User>[] = [
  {
    accessorKey: "_id",
    header: "ID",
  },
  {
    accessorKey: "firstname",
    header: () => <div className="w-max">First Name</div>,
  },
  {
    accessorKey: "lastname",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <span className="flex">
          Email
          {column.getIsSorted() === "desc" ? (
            <ArrowUp
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            />
          ) : (
            <ArrowDown
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            />
          )}
        </span>
      );
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.getValue("phone");
      return <div className="w-max">{phone as unknown as React.ReactNode}</div>;
    },
  },
  {
    accessorKey: "dob",
    header: () => <div className="w-max">Date of Birth</div>,
    cell: ({ row }) => {
      const dob = new Date(row.getValue("dob"));
      const date = new Intl.DateTimeFormat("en-US").format(
        dob as unknown as Date
      );
      return <div className="w-max">{date}</div>;
    },
  },
  {
    accessorKey: "uid",
    header: "UID",
  },
  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => {
      const country = row.getValue("country");
      return (
        <div className="w-max">{country as unknown as React.ReactNode}</div>
      );
    },
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "zipCode",
    header: () => <div className="w-max">Zip Code</div>,
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
];
