import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../utils/axios";
import { DataResponse, IUpdateProfile, fetchResponse } from "./authResponses";
import { getAsyncStorage } from "../../../utils/asyncStorage";

// ----------FETCH-------------
export const fetchUserThunk = createAsyncThunk("auth/fetchUserData", async (): Promise<{ body: fetchResponse }> => {
  const token = await getAsyncStorage("token");
  const response = await request.get("user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

//? ----------SIGNUP-------------
export const signupThunk = createAsyncThunk(
  "auth/signupThunk",
  async (payload: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Promise<{ body: DataResponse }> => {
    const response = await request.post("user/sign-up", payload);
    return response.data;
  }
);

//? ----------GOOGLE SIGNUP-------------
export const googleThunk = createAsyncThunk(
  "auth/googleSignup",
  async (id_token: string): Promise<{ body: DataResponse }> => {
    const response = await request.post("user/google", id_token);
    return response.data;
  }
);

//* ------------LOGIN------------------
export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }): Promise<{ body: DataResponse }> => {
    const res = await request.post("user/login", payload);
    return res.data;
  }
);

//! ---------PATCH--------------
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data: IUpdateProfile): Promise<{ body: DataResponse }> => {
    const res = await request.patch("user/profile", data);
    return res.data;
  }
);
