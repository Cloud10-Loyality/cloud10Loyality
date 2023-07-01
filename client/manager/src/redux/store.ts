import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";
import { sidebarReducer, authReducer, tierReducer } from "./slices";

export function createStore(preloadedState = {}) {
  const store = configureStore({
    reducer: {
      sidebarReducer,
      authReducer,
      tierReducer,
    },
    preloadedState,
  });

  return store;
}

export const store = createStore({});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useDispatch = () => useDispatchBase<AppDispatch>();

export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
