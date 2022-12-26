import { createSlice } from "@reduxjs/toolkit";
import { STATE_STATUS } from "../../types/common.types";
import { RootState } from "../store";
import { signUpThunk } from "./authThunks";

interface InitState {
  isAuth: boolean;
  status: STATE_STATUS;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  google_id: string;
}

const initialState: InitState = {
  isAuth: false,
  status: STATE_STATUS.idle,
  first_name: "",
  last_name: "",
  email: "",
  avatar: "",
  google_id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpThunk.pending, (state) => {
        state.status = STATE_STATUS.loading;
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.status = STATE_STATUS.success;
        state.isAuth = true;
        state.first_name = action.payload.body.first_name;
        state.last_name = action.payload.body.last_name;
        state.email = action.payload.body.email;
        state.avatar = action.payload.body.avatar;
        state.google_id = action.payload.body.google_id;
      })
      .addCase(signUpThunk.rejected, (state) => {
        state.status = STATE_STATUS.failed;

        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
