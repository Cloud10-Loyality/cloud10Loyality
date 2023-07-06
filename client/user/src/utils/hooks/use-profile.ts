import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/Redux/store";
import { ResStatus } from "./use-login";

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
  user: User[];
}

export interface User {
  __v: number;
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  uid: string;
  phone: number;
  country: string;
  gender: string;
  dob: Date;
  id: string;
  city: string;
  zipCode: string;
  state: string;
  updatedAt: Date;
  points: number;
}

export const useProfile = (): {
  user: User[];
  loading: boolean;
} => {
  const [user, setUser] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get<ResRootObject & ErrRootObject>(
          "http://cloud10lms.com/api/v1/user/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(accessToken, "use profile hook");
        if (res.data.error) {
          console.error("Error fetching User:", res.data.err);
          setLoading(false);
        } else {
          setUser(res.data.data.user);
          setLoading(false);
          console.log(res.data.data.user, "++++++++++");
        }
      } catch (err) {
        console.error("Error fetching User:", err);
        setLoading(false);
      }
    };

    fetchUser();
  }, [accessToken]);

  return { user, loading };
};
