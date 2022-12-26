import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../utils/axios";

interface SignUpResponse {
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  google_id: string;
}

export const SignUpThunk = createAsyncThunk(
  "auth/SignUpThunk",
  async (payload: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Promise<{ body: SignUpResponse }> => {
    const response = await request.post("/user/sign-up", payload);
    return response.data;
  }
);
