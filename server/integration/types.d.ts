export interface Integration {
  username: string;
  password: string;
  email: string;
  id: ObjectID;
  name: string;
  description: string;
  city: string;
  state: string;
  pin: string;
}

type Role = "ADMIN" | "MANAGER" | "USER";
