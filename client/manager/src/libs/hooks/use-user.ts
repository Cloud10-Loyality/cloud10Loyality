import axios from "axios";

export interface RootObject {
  data: Data;
  error: boolean;
  status: string;
  totalRecords: number;
}

export interface Data {
  users: User[];
}

export interface User {
  __v: number;
  _id: string;
  age: number;
  city: string;
  country: Country;
  dob: Date;
  email: string;
  firstname: string;
  gender: Gender;
  lastname: string;
  phone: number;
  state: string;
  uid: string;
  zipCode: number;
}

export enum Country {
  India = "India",
}

export enum Gender {
  Female = "female",
  Male = "male",
}

export const useUser = async (): Promise<User[]> => {
  const res = await axios.get<RootObject>(
    "http://cloud10lms.com/api/v1/manager/user"
  );

  return res.data.data.users;
};
