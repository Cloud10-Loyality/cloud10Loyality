"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../ui/data-table";
import React from "react";
import { User } from "@/libs/hooks/use-user";

type Props = {
  column: ColumnDef<User>[];
  data: User[];
};

const UserTable = ({ column, data }: Props) => {
  return (
    <div>
      <DataTable columns={column} data={data} />
    </div>
  );
};

export default UserTable;
