import axios from "axios";

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

export const useBooking = async (): Promise<Reservation[]> => {
  const res = await axios.get<RootObject>(
    "http://cloud10lms.com/api/v1/manager/reservation"
  );

  return res.data.data.reservations;
};
