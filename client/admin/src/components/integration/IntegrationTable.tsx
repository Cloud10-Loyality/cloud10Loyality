"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table/DataTable";
import React from "react";
import { Integration } from "@/libs/hooks/use-integration";

type Props = {
  column: ColumnDef<Integration>[];
  data: Integration[];
};

const IntegrationTable = ({ column, data }: Props) => {
  return (
    <div>
      <DataTable columns={column} data={data} />
    </div>
  );
};

export default IntegrationTable;
