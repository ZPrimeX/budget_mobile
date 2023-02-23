import { createSlice } from "@reduxjs/toolkit";
import { REDUX_STATUS } from "../../types/common.types";
import { RootState } from "../store";
import { fetchUserThunk, googleThunk, login, signupThunk, updateProfile } from "./authThunks";
import { removeAsyncStorage } from "../../../utils/asyncStorage";

interface InitState {
  isAuth: boolean;
  status: REDUX_STATUS;
  first_name: string;
  last_name: string;
  email: string;
  token: string;
  avatar: string;
  google_id: string;
  createdAt: string;
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
  createdAt: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.first_name = "";
      state.last_name = "";
      state.email = "";
      state.token = "";
      state.avatar = "";
      state.google_id = "";
      removeAsyncStorage("token");
    },
  },
  extraReducers: (builder) => {
    // ----------FETCH-------------
    builder
      .addCase(fetchUserThunk.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(fetchUserThunk.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.first_name = action.payload.body.first_name;
        state.last_name = action.payload.body.last_name;
        state.email = action.payload.body.email;
        state.avatar = action.payload.body.avatar;
        state.createdAt = action.payload.body.createdAt;
        state.isAuth = true;
      })
      .addCase(fetchUserThunk.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });

    //? -------------SIGNUP---------------
    builder
      .addCase(signupThunk.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.first_name = action.payload.body.first_name;
        state.last_name = action.payload.body.last_name;
        state.email = action.payload.body.email;
        state.avatar = action.payload.body.avatar;
        state.google_id = action.payload.body.google_id;
        state.isAuth = true;
      })
      .addCase(signupThunk.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
        state.isAuth = false;
      });

    //? -------------GOOGLE SIGNUP---------------

    builder
      .addCase(googleThunk.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(googleThunk.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.first_name = action.payload.body.first_name;
        state.last_name = action.payload.body.last_name;
        state.email = action.payload.body.email;
        state.avatar = action.payload.body.avatar;
        state.google_id = action.payload.body.google_id;
        state.isAuth = true;
      })
      .addCase(googleThunk.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });

    //* -------------LOGIN---------------
    builder
      .addCase(login.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.first_name = action.payload.body.first_name;
        state.last_name = action.payload.body.last_name;
        state.email = action.payload.body.email;
        state.avatar = action.payload.body.avatar;
        state.isAuth = true;
        state.token = action.payload.body.token;
      })
      .addCase(login.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });

    //! -------------PATCH---------------
    builder
      .addCase(updateProfile.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.first_name = action.payload.body.first_name;
        state.last_name = action.payload.body.last_name;
        state.email = action.payload.body.email;
        state.avatar = action.payload.body.avatar;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });
  },
});

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const { logout } = authSlice.actions;
