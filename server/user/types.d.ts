export type UserType = {
  _id?: Types.ObjectId;
  firstname: string;
  lastname: string;
  email: string;
  uid: string;
  dob: Date;
  age: number;
  gender: "male" | "female" | "other";
  phone: number;
  country: string;
  state: string;
  city: string;
  zipCode: number;
};
