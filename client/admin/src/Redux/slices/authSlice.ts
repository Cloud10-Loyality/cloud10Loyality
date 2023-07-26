import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { authState } from "../states";
import axios from "axios";
import { store } from "../store";

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
      console.log(action.payload, "In the redux slice");
      state.accessToken = action.payload;
    },
  },
});

export const { setAccessToken, setLoading } = AuthSlice.actions;

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

export const logout = () => async (dispatch: typeof store.dispatch) => {
  dispatch(setAccessToken(""));
};

//   await axios.post("/api/logout");
// };

export default AuthSlice.reducer;
