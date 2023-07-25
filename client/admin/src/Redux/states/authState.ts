type AuthState = {
  accessToken: string;
  authLoading: boolean;
};

export const authState: AuthState = {
  accessToken: "",
  authLoading: false,
};
