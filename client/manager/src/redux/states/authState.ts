import { ManagerType } from "../../../types";

type AuthState = {
  accessToken: string;
  manager: ManagerType | null;
  authLoading: boolean;
};

export const authState: AuthState = {
  accessToken: "",
  manager: null,
  authLoading: false,
};
