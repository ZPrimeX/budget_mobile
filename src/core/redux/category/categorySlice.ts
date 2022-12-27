// import { createSlice } from "@reduxjs/toolkit";
// import { REDUX_STATUS } from "../../types/common.types";
// import { createCategory, deleteCategory, editCategory, fetchCategories } from "./categoryThunks";

// interface Category {
//   id: string;
//   title: string;
//   category_type: "expense" | "income";
// }

// interface InitState {
//   categories: Category[];
//   //? GENERIC INTERFACE   categories: Array<{ id: string; title: string }>;
//   status: REDUX_STATUS;
// }

// const initialState: InitState = {
//   categories: [],
//   status: REDUX_STATUS.idle,
// };

// const categorySlice = createSlice({
//   name: "category",
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     //* --- CREATE ---
//     builder
//       .addCase(createCategory.pending, (state) => {
//         state.status = REDUX_STATUS.pending;
//       })
//       .addCase(createCategory.fulfilled, (state, action) => {
//         state.status = REDUX_STATUS.fulfilled;
//         state.categories = [...state.categories, action.payload.body];
//       })
//       .addCase(createCategory.rejected, (state) => {
//         state.status = REDUX_STATUS.rejected;
//       });

//     //* --- FETCH ---
//     builder
//       .addCase(fetchCategories.pending, (state) => {
//         state.status = "pending";
//       })
//       .addCase(fetchCategories.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         state.categories = action.payload.body;
//       })
//       .addCase(fetchCategories.rejected, (state) => {
//         state.status = "rejected";
//       });

//     //? --- EDIT ---
//     builder
//       .addCase(editCategory.pending, (state) => {
//         state.status = "pending";
//       })
//       .addCase(editCategory.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         state.categories = state.categories.map((category) => {
//           if (category.id === action.payload.body.id) {
//             return (category = action.payload.body);
//           }
//           return category;
//         });
//       })
//       .addCase(editCategory.rejected, (state) => {
//         state.status = "rejected";
//       });

//     //! --- DELETE  ---
//     builder
//       .addCase(deleteCategory.pending, (state) => {
//         state.status = "pending";
//       })
//       .addCase(deleteCategory.fulfilled, (state, action) => {
//         state.status = "fulfilled";
//         state.categories = state.categories.filter((category) => category.id !== action.payload.body);
//         toast.success("Success!");
//       })
//       .addCase(deleteCategory.rejected, (state) => {
//         state.status = "rejected";
//       });
//   },
// });

// export default categorySlice.reducer;
// export const selectCategory = (state) => state.category.categories;
