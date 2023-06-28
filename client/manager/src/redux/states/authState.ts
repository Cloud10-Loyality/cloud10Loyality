import { ManagerType } from "../../../types";

type AuthState = {
  accessToken: string;
  manager: ManagerType | {};
};

export const authState: AuthState = {
  accessToken: "",
  manager: {},
};
