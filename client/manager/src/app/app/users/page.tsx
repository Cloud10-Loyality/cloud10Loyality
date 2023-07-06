import React, { Suspense } from "react";

import { DataTable } from "@/components/ui/data-table";
import Loading from "./loading";
import { USER_COLUMN } from "@/constants/table-columns";
import UserTable from "@/components/user/UserTable";
import { useUser } from "@/libs/hooks";

type Props = {};

export default async function Users({}: Props) {
  const USER_DATA = await useUser();
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <UserTable column={USER_COLUMN} data={USER_DATA} />
      </Suspense>
    </div>
  );
}
