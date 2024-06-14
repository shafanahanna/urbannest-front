import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
  error: "",
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signinStart: (state) => {
      state.loading = true;
      console.log("Signin start");
    },
    signinSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = "";
      console.log("Signin success", action.payload);
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    signinFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.log("Signin failure", action.payload);
    },
    signout: (state) => {
      state.currentUser = null;
      console.log("Signout");
      localStorage.removeItem("currentUser");
    },
    updateUserStart: (state) => {
      state.loading = true;
      console.log("Update user start");
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      console.log("Update user success", action.payload);
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
    },
    updateUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      console.log("Update user fail", action.payload);
    },
    deleteaccntStart: (state) => {
      state.loading = true;
      console.log("Delete account start");
    },
    deleteaccntSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      console.log("Delete account success");
    },
    deleteaccntFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      console.log("Delete account fail", action.payload);
    },
  },
});

export const {
  signinStart,
  signinSuccess,
  signinFailure,
  signout,
  updateUserStart,
  updateUserSuccess,
  updateUserFail,
  deleteaccntStart,
  deleteaccntFail,
  deleteaccntSuccess,
} = userSlice.actions;

export default userSlice.reducer;
