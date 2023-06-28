import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authState } from "../states";
import { store } from "../store";
import axios from "axios";
import { LoginResponse } from "@/app/api/login/route";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage";
import { ManagerType } from "../../../types";

const AuthSlice = createSlice({
  name: "authSlice",
  initialState: authState,
  reducers: {
    setAccessToken(
      state: Draft<typeof authState>,
      action: PayloadAction<(typeof authState)["accessToken"]>
    ) {
      state.accessToken = action.payload;
    },
    setManager(
      state: Draft<typeof authState>,
      action: PayloadAction<(typeof authState)["manager"]>
    ) {
      state.manager = action.payload;
    },
  },
});

export const { setAccessToken, setManager } = AuthSlice.actions;

export const login =
  (data: { email: string; password: string }) =>
  async (dispatch: typeof store.dispatch) => {
    const {
      data: {
        data: { accessToken },
      },
    } = await axios.post<LoginResponse>("/api/login", data);

    dispatch(setAccessToken(accessToken));
  };

export const handleManager =
  (data: Partial<ManagerType>) => async (dispatch: typeof store.dispatch) => {
    dispatch(setManager(data));
  };

export const logout = () => async (dispatch: typeof store.dispatch) => {
  dispatch(setAccessToken(""));

  await axios.post("/api/logout");
};

export default AuthSlice.reducer;
