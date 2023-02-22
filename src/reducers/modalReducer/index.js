import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  displayModal: false,
  whichContent: "undefined",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.displayModal = true;
    },
    closeModal: (state) => {
      state.displayModal = false;
    },
    showContent: (state, action) => {
      state.whichContent = action.payload;
    },
    removeContent: (state) => {
      state.whichContent = "undefined";
    },
  },
});

export const { openModal, closeModal, showContent, removeContent } =
  modalSlice.actions;

export const selectDisplayModal = (state) => state.modal.displayModal;

export const selectWhichContent = (state) => state.modal.whichContent;

export default modalSlice.reducer;
