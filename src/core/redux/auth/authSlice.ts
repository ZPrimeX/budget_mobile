import { createSlice } from "@reduxjs/toolkit";
import { REDUX_STATUS } from "../../types/common.types";
import { RootState } from "../store";

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
  name: "",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
