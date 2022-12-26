import { createSlice } from "@reduxjs/toolkit";
import { STATE_STATUS } from "../../types/common.types";
import { RootState } from "../store";

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
  extraReducers: (builder) => {},
});

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
