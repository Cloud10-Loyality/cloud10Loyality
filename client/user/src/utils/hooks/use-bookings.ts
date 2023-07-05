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
  bookings: Bookings[];
}

export interface Bookings {
  __v: number;
  _id: string;
  amount: number;
  checkIn: Date;
  checkOut: Date;
  city: string;
  createdAt: Date;
  hotelName: string;
  id: string;
  paymentMethod: string;
  zipCode: string;
  state: string;
  updatedAt: Date;
}

export const useBooking = (): {
  bookings: Bookings[];
  loading: boolean;
} => {
  const [bookings, setBookings] = useState<Bookings[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { accessToken } = useSelector((state: RootState) => state.authReducer);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get<ResRootObject & ErrRootObject>(
          "http://cloud10lms.com/api/v1/user/bookings/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (res.data.error) {
          console.error("Error fetching bookings:", res.data.err);
          setLoading(false);
        } else {
          setBookings(res.data.data.bookings);
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [accessToken]);

  return { bookings, loading };
};
