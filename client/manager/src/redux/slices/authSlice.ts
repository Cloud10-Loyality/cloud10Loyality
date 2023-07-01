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
    setLoading(
      state: Draft<typeof authState>,
      action: PayloadAction<(typeof authState)["authLoading"]>
    ) {
      state.authLoading = action.payload;
    },
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

export const { setAccessToken, setManager, setLoading } = AuthSlice.actions;

export const login =
  (data: { accessToken?: string }) =>
  async (dispatch: typeof store.dispatch) => {
    // dispatch(setLoading(true));
    // const {
    //   data: {
    //     data: { accessToken },
    //   },
    // } = await axios.post<LoginResponse>("/api/login", data);

    dispatch(setAccessToken(data.accessToken!));
    // dispatch(setLoading(false));
  };

export const handleManager =
  (data: Partial<ManagerType>) => async (dispatch: typeof store.dispatch) => {
    dispatch(setManager(data));
  };

export const logout = () => async (dispatch: typeof store.dispatch) => {
  dispatch(setAccessToken(""));
};

export default AuthSlice.reducer;
