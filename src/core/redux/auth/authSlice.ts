import { createSlice } from "@reduxjs/toolkit";
import { REDUX_STATUS } from "../../types/common.types";
import { RootState } from "../store";
import { SignUpThunk } from "./authThunks";

interface InitState {
  isAuth: boolean;
  status: REDUX_STATUS;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  avatar: string;
  google_id: string;
}

const initialState: InitState = {
  isAuth: false,
  status: REDUX_STATUS.idle,
  first_name: "",
  last_name: "",
  email: "",
  token: "",
  avatar: "",
  google_id: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SignUpThunk.pending, (state, action) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(SignUpThunk.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.first_name = action.payload.body.first_name;
        state.last_name = action.payload.body.last_name;
        state.email = action.payload.body.email;
        state.avatar = action.payload.body.avatar;
        state.google_id = action.payload.body.google_id;
        state.isAuth = true;
      })
      .addCase(SignUpThunk.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
        state.isAuth = false;
      });
  },
});

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
