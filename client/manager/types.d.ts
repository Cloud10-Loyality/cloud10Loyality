export type ManagerType = {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  name: string;
  role: Role;
  city: string;
  state: string;
  pin: string;
  description: string;
};

type Role = "ADMIN" | "MANAGER" | "USER";
