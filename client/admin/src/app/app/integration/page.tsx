import { INTEGRATION_COLUMN } from "@/components/constants/integration/integration-coulmns";
import IntegrationTable from "@/components/integration/IntegrationTable";
import React from "react";
import axios from "axios";
import { decodeStr } from "@/libs/utils";
import { Integration } from "@/libs/hooks/use-integration";

type Props = {};

export interface RootObject {
  data: Data;
  error: boolean;
  message: string;
  totalRecords: number;
}

export interface Data {
  integration: Integartion[];
}

export interface Integartion {
  __v: number;
  _id: string;
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}
interface ApiResponse {
  status: string;
  error: boolean;
  totalRecords: number;
  message: string;
  data: {
    integration: Integration[];
  };
}

const getIntegration = async (accessToken: string): Promise<Integartion[]> => {
  const res = await axios.get<ApiResponse>(
    "http://cloud10lms.com/api/v1/integration",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  if (res.data.error) {
    throw new Error(res.data.message);
  }
  return res.data.data.integration;
};

export default async function Bookings(props: any) {
  let q = props?.searchParams["q"];

  q = q && decodeStr(q);

  const res = await getIntegration(q?.accessToken);

  return (
    <div>
      <IntegrationTable column={INTEGRATION_COLUMN} data={res} />
    </div>
  );
}
