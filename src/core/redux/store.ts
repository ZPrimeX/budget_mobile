import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import categorySlice from "./category/categorySlice";
import walletSlice from "./wallet/walletSlice";
import transactionSlice from "./transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    category: categorySlice,
    wallet: walletSlice,
    transaction: transactionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
