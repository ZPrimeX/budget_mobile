import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../utils/axios";

export const createWallet = createAsyncThunk("wallet/createWallet", async (data) => {
  const res = await request.post("/wallet/new", data);
  return res.data;
});

export const fetchWallets = createAsyncThunk("wallet/fetchWallets", async () => {
  const res = await request.get("/wallet/all");
  return res.data;
});

export const editWallet = createAsyncThunk("wallet/editWallet", async (id: string, body) => {
  const res = await request.patch(`wallet/${id}`, body);
  return res.data;
});

export const deleteWallet = createAsyncThunk("wallet/deleteWallet", async (id: string) => {
  const res = await request.delete(`wallet/${id}`);
  return res.data;
});

export const findWallet = createAsyncThunk("wallet/findWallet", async (id: string) => {
  const res = await request.get(`wallet/${id}`);
  return res.data;
});
