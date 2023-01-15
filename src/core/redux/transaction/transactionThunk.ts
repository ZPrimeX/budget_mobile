import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../utils/axios";

export const createTransaction = createAsyncThunk("transaction/createTransaction", async (data) => {
  const res = await request.post("/transaction/new", data);
  return res.data;
});

export const fetchTransactions = createAsyncThunk("transaction/fetchTransactions", async (id: string) => {
  const res = await request.get(`/transaction/get/${id}`);
  return res.data;
});

export const editTransaction = createAsyncThunk("transaction/editTransaction", async (id: string, data) => {
  const res = await request.patch(`/transaction/${id}`, data);
  return res.data;
});

export const deleteTransaction = createAsyncThunk("transaction/deleteTransaction", async (id: string) => {
  const res = await request.delete(`/transaction/${id}`);
  return res.data;
});
