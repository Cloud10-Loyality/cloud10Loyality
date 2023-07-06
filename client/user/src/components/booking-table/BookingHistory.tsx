"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import React from "react";
import { Bookings } from "@/utils/hooks/use-bookings";

type Props = {
  column: ColumnDef<Bookings>[];
  data: Bookings[];
};

const BookingTable = ({ column, data }: Props) => {
  return (
    <div>
      <DataTable columns={column} data={data} />
    </div>
  );
};

export default BookingTable;
