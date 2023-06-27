"use client";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { USER_COLUMN } from "@/constants/table-columns";

import React from "react";

export default function Loading() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: [],
    columns: USER_COLUMN,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  console.log(table.getAllColumns());

  return (
    <div className="rounded-md border">
      <Table className="relative border-collapse">
        <TableHeader className="bg-secondary-light dark:bg-secondary-dark">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="sticky top-0">
                    {header.isPlaceholder
                      ? (null as unknown as React.ReactNode)
                      : (flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        ) as unknown as React.ReactNode)}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          <TableRow>
            {table.getAllColumns().map((col) => (
              <TableCell
                colSpan={USER_COLUMN.length}
                className="h-10 bg-slate-700 animate-pulse text-center"
              >
                &nbsp;
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
