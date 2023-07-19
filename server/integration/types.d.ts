export type ManagerType = {
  _id?: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  city: string;
  state: string;
  pin: string;
  description: string;
};

type Role = "ADMIN" | "MANAGER" | "USER";

export type ResponseBody = {
  status: "success" | "fail";
  error: boolean;
  message: string;
  totalRecords?: number;
  data: any;
};
