import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";

import { authState } from "../states";
import axios from "axios";
import { store } from "../store";

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
    setUser(
      state: Draft<typeof authState>,
      action: PayloadAction<(typeof authState)["user"]>
    ) {
      state.user = action.payload;
    },
  },
});

export const { setAccessToken, setUser } = AuthSlice.actions;

// export const login =
//   (data: { email: string; password: string }) =>
//   async (dispatch: typeof store.dispatch) => {
//     const {
//       data: {
//         data: { accessToken },
//       },
//     } = await axios.post<LoginResponse>("/api/login", data);

//     dispatch(setAccessToken(accessToken));
//   };

// export const logout = () => async (dispatch: typeof store.dispatch) => {
//   dispatch(setAccessToken(""));

//   await axios.post("/api/logout");
// };

export default AuthSlice.reducer;
