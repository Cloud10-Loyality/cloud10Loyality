import { Draft, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sidebarState } from "../states";
import { store } from "../store";

export const SidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState: sidebarState,
  reducers: {
    toggleSidebar(
      state: Draft<typeof sidebarState>,
      action: PayloadAction<boolean>
    ) {
      state.isOpen = action.payload;
    },
  },
});

export const { toggleSidebar } = SidebarSlice.actions;

export const handleSidebar =
  (value: boolean) => (dispatch: typeof store.dispatch) => {
    dispatch(toggleSidebar(value));
  };

export default SidebarSlice.reducer;
