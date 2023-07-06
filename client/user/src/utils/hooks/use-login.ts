import axios from "axios";
import { useState } from "react";

export interface ErrorRootObject {
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

export interface ResponseRootObject {
  data: Data;
  error: boolean;
  message: string;
  status: ResStatus;
}

export interface Data {
  [x: string]: string;
  accessToken: string;
}

export interface LoginBody {
  email: string;
}

export enum ResStatus {
  Success = "success",
  Fail = "fail",
}

export const useLogin = () => {
  const [response, setResponse] = useState<{
    error: ResStatus;
    message: string;
    data: Data | null;
  }>({
    error: ResStatus.Fail,
    message: "",
    data: null,
  });

  const login = async (body: LoginBody) => {
    try {
      const res = await axios.post<ResponseRootObject & ErrorRootObject>(
        "http://cloud10lms.com/api/v1/user/auth/login",
        body
      );

      setResponse({
        error: ResStatus.Success,
        message: res.data.message,
        data: {
          accessToken: res.data.data.accessToken,
        },
      });
    } catch (error) {
      if (axios.isAxiosError<ErrorRootObject, Record<string, unknown>>(error)) {
        // console.log(error.response?.data.message);
        setResponse({
          error: ResStatus.Fail,
          message: error.response?.data.message!,
          data: null,
        });
      }
    }
  };
  //   console.log(response);

  return { login, response };
};
