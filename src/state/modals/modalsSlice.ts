import { createSlice } from "@reduxjs/toolkit";

interface ModalsState {
  opened_authModal: boolean;
}

const initialState: ModalsState = {
  opened_authModal: false,
};

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    showAuthModal: (state) => {
      state.opened_authModal = true;
    },
    hideAuthModal: (state) => {
      state.opened_authModal = false;
    },
  },
});

export const { hideAuthModal, showAuthModal } = modalsSlice.actions;

export default modalsSlice.reducer;
