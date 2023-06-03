import { DataTable } from "@/components/ui/data-table";
import React from "react";
import { USER_COLUMN } from "@/constants/table-columns";
import UserTable from "@/components/user/UserTable";
import { useUser } from "@/libs/hooks";

type Props = {};

export default function Users({}: Props) {
  const USER_DATA = useUser();
  return (
    <div>
      <UserTable column={USER_COLUMN} data={USER_DATA} />
    </div>
  );
}
