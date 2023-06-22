"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import React from "react";
import { Reservation } from "@/libs/hooks/use-bookings";

type Props = {
  column: ColumnDef<Reservation>[];
  data: Reservation[];
};

const BookingTable = ({ column, data }: Props) => {
  return (
    <div>
      <DataTable columns={column} data={data} />
    </div>
  );
};

export default BookingTable;
