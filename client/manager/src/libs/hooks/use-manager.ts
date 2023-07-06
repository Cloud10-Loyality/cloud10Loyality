import axios from "axios";
import { useState } from "react";

export interface ErrRootObject {
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
  manager: Manager;
}

export interface Manager {
  __v: number;
  _id: string;
  createdAt: Date;
  email: string;
  id: string;
  name: string;
  role: string;
  updatedAt: Date;
  username: string;
}

export enum ResStatus {
  Success = "success",
  Fail = "fail",
}

export interface Response {
  status?: ResStatus;
  message?: string;
  data?: Data | null;
  error?: boolean;
}

export const useManager = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const getManager = async (accessToken: string): Promise<Response> => {
    try {
      const res = await axios.get<ResRootObject & ErrRootObject>(
        "http://cloud10lms.com/api/v1/manager/me",
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setLoading(false);
      return {
        error: res.data.error,
        status: ResStatus.Success,
        message: res.data.message,
        data: {
          manager: res.data.data.manager,
        },
      };
    } catch (err) {
      setLoading(false);
      if (axios.isAxiosError<ErrRootObject, Record<string, unknown>>(err)) {
        return {
          error: true,
          status: ResStatus.Fail,
          message: err.response?.data.message,
          data: null,
        };
      }
    }

    return {
      error: true,
      status: ResStatus.Fail,
      message: "Something went wrong",
      data: null,
    };
  };

  return { loading, getManager };
};
