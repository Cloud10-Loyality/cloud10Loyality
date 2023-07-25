import { RootState } from "@/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/Redux/slices/authSlice";
import axios from "axios";

export interface ResRootObject {
  data?: Data;
  error?: boolean;
  status?: ResStatus;
  message?: string;
}

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

export interface Data {
  accessToken: string;
}

export enum ResStatus {
  Success = "success",
  Fail = "fail",
}

export interface LoginData {
  username: string;
  password: string;
}

export interface Response {
  status?: ResStatus;
  error?: boolean;
  data?: Data | null;
  message?: ErrRootObject["message"] | ResRootObject["message"];
}

export const LoginAuth = () => {
  const { accessToken } = useSelector((state: RootState) => state.authReducer);
  const dispatch = useDispatch();

  const login = async (data: LoginData): Promise<Response> => {
    dispatch(setLoading(true));
    try {
      const res = await axios.post<ResRootObject & ErrRootObject>(
        "http://cloud10lms.com/api/v1/admin/auth/login",
        data
      );

      dispatch(setLoading(false));
      return {
        status: ResStatus.Success,
        error: res.data.error,
        data: res.data.data,
        message: res.data.message,
      };
    } catch (err) {
      dispatch(setLoading(false));
      if (axios.isAxiosError<ErrRootObject, Record<string, unknown>>(err)) {
        return {
          status: ResStatus.Fail,
          error: true,
          message: err.response?.data.message,
          data: null,
        };
      }
    }

    dispatch(setLoading(false));
    return {
      status: ResStatus.Fail,
      error: true,
      message: "Something went wrong",
      data: null,
    };
  };
  return { login };
};
