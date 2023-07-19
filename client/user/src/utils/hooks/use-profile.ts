import { ResStatus } from "./use-login";
import { RootState } from "@/Redux/store";
import axios from "axios";

export interface ErrRootObject {
  data: any;
  err: Err;
  message: string;
  stack: string;
  status: ResStatus;
}

export interface Err {
  isOperational: boolean;
  status: ResStatus;
  statusCode: number;
}

export interface ResRootObject {
  data: Data;
  error: boolean;
  status: ResStatus;
}

export interface Data {
  user: User;
}

export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  gender: string;
  age: number;
  uid: string;
  dob: Date;
  phone: number;
  country: string;
  state: string;
  city: string;
  zipCode: number;
  __v: 0;
}

export const getProfile = async (accessToken: string): Promise<User> => {
  const res = await axios.get<ResRootObject>(
    "http://cloud10lms.com/api/v1/user/me",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.data.user;
};
