import { BOOKING_COLUMN } from "@/constants/table-columns";
import BookingTable from "@/components/booking/BookingTable";
import React from "react";
import axios from "axios";
import { decodeStr } from "@/libs/utils";
import { useBooking } from "@/libs/hooks/use-bookings";

type Props = {};

export interface RootObject {
  data: Data;
  error: boolean;
  message: string;
  totalRecords: number;
}

export interface Data {
  reservations: Reservation[];
}

export interface Reservation {
  __v: number;
  _id: string;
  amount: number;
  checkIn: Date;
  checkOut: Date;
  city: string;
  createdAt: Date;
  hotelName: string;
  id: string;
  managerId: string;
  paymentMethod: string;
  pin: string;
  state: string;
  updatedAt: Date;
  user: User;
}

export interface User {
  age: number;
  city: string;
  country: string;
  dob: Date;
  email: string;
  firstname: string;
  gender: string;
  lastname: string;
  phone: number;
  state: string;
  uid: string;
  zipCode: number;
}

const getReservations = async (accessToken: string): Promise<Reservation[]> => {
  const res = await axios.get<RootObject>(
    "http://cloud10lms.com/api/v1/manager/reservation",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return res.data.data.reservations;
};

export default async function Bookings(props) {
  let q = props?.searchParams["q"];

  q = q && decodeStr(q);

  const res = await getReservations(q?.accessToken);

  return (
    <div>
      <BookingTable column={BOOKING_COLUMN} data={res} />
    </div>
  );
}
