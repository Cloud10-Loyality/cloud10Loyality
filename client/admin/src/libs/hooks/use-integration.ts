import axios from "axios";

export interface RootObject {
  data: Data;
  error: boolean;
  message: string;
  totalRecords: number;
}

export interface Data {
  integration: Integration[];
}

export interface Integration {
  __v: number;
  _id: string;
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
}

export const useBooking = async (): Promise<Integration[]> => {
  const res = await axios.get<RootObject>(
    "http://cloud10lms.com/api/v1/integration"
  );

  return res.data.data.integration;
};
