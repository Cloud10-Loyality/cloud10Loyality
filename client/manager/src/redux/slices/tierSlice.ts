import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { authState } from "../states";
import { store } from "../store";
import axios from "axios";
import { LoginResponse } from "@/app/api/login/route";
import { staticGenerationAsyncStorage } from "next/dist/client/components/static-generation-async-storage";
import { ManagerType } from "../../../types";
import { Tier } from "@/libs/hooks/use-tier";

interface TierState {
  tiers: Tier[];
}

const tierState: TierState = {
  tiers: [],
};

const TierSlice = createSlice({
  name: "tierSlice",
  initialState: tierState,
  reducers: {
    setTiers(state: Draft<TierState>, action: PayloadAction<Tier[]>) {
      state.tiers = action.payload;
    },
  },
});

export const { setTiers } = TierSlice.actions;

export const getTiers = () => async (dispatch: typeof store.dispatch) => {
  const { manager, accessToken } = store.getState().authReducer;

  const res = await axios.get(
    `http://cloud10lms.com/api/v1/tier/${manager?._id}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  console.log({ response: res.data });
};

export default TierSlice.reducer;
