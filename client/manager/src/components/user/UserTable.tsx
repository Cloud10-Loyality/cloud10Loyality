"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import React from "react";
import { UserType } from "@/constants/table-columns";

type Props = {
  column: ColumnDef<UserType>[];
  data: UserType[];
};

const UserTable = ({ column, data }: Props) => {
  return (
    <div>
      <DataTable columns={column} data={data} />
    </div>
  );
};

export default UserTable;
