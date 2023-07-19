import { User } from "@/utils/hooks/use-profile";

type AuthState = {
  accessToken: string;
  user: User;
};

export const authState: AuthState = {
  accessToken: "",
  user: {} as User,
};
