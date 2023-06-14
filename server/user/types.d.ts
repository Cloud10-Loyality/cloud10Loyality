export type UserType = {
  _id?: Types.ObjectId;
  firstname?: string;
  lastname?: string;
  email?: string;
  uid?: string;
  dob?: Date;
  age?: number;
  tier?: "SILVER" | "GOLD" | "PLATINUM";
  gender?: "male" | "female" | "other";
  phone?: number;
  country?: string;
  state?: string;
  city?: string;
  zipCode?: number;
};

export type BookingType = {
  _id?: Types.ObjectId;
  hotelName?: string;
  checkIn?: Date;
  checkOut?: Date;
  amount?: number;
  numberOfGuests?: number;
  paymentMethod?: string;
  userEmail?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: number;
};
