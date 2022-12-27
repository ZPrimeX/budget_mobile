import { createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../utils/axios";

//*------------CREATE-----------
export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data: { title: string; category_type: "expense" | "income" }) => {
    const res = await request.post("category/new", data);
    return res.data;
  }
);

// -----------FETCH----------------
export const fetchCategories = createAsyncThunk("category/fetchCategories", async () => {
  const res = await request.get("category/all");
  return res.data;
});

//?-------------PATCH------------
export const editCategory = createAsyncThunk(
  "category/editCategory",
  async (payload: { id: string; body: { title: string; category_type: "expense" | "income" } }) => {
    const res = await request.patch(`category/${payload.id}`, payload.body);
    return res.data;
  }
);

//!----------DELETE----------------
export const deleteCategory = createAsyncThunk("category/deleteCategory", async (id: string) => {
  const res = await request.delete(`category/${id}`);
  return res.data;
});
