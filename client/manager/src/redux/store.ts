import { authReducer, sidebarReducer, tierReducer } from "./slices";
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    sidebarReducer,
    authReducer,
    tierReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
