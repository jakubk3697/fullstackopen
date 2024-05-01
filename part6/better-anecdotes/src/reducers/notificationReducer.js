import { createSlice } from "@reduxjs/toolkit";

export const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification: (state, action) => action.payload,
    clearNotification: () => null,
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
