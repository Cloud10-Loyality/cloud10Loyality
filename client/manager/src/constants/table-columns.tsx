"use client";

import { ArrowDown, ArrowUp } from "@/components/ui/icons";

import { ColumnDef } from "@tanstack/react-table";

export type UserType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  address: string;
  city: string;
  postalCode: string;
  state: string;
  age: number;
  gender: string;
};

export const USER_COLUMN: ColumnDef<UserType>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
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
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "postalCode",
    header: "Postal Code",
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
