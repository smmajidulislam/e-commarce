import { createSlice } from "@reduxjs/toolkit";

const profileTabSlice = createSlice({
  name: "profileTab",
  initialState: "profile", // default tab
  reducers: {
    setProfileTab: (state, action) => action.payload,
  },
});

export const { setProfileTab } = profileTabSlice.actions;
export default profileTabSlice.reducer;
