import { createSlice } from "@reduxjs/toolkit";
import { REDUX_STATUS } from "../../types/common.types";
import { createTransaction, deleteTransaction, editTransaction, fetchTransactions } from "./transactionThunk";
import { RootState } from "../store";

interface Transaction {
  id: string;
  amount: number;
  note: string;
  date: Date;
}

interface InitState {
  transactions: Transaction[];
  status: REDUX_STATUS;
}

const initialState: InitState = {
  transactions: [],
  status: REDUX_STATUS.idle,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
  extraReducers(builder) {
    // ---Create Transaction---
    builder
      .addCase(createTransaction.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.transactions = [...state.transactions, action.payload.body];
      })
      .addCase(createTransaction.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });

    // --- Fetching Transactions ---

    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.transactions = action.payload.body;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });

    //? --- EDIT ---
    builder
      .addCase(editTransaction.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.transactions = state.transactions.map((transaction) => {
          if (transaction.id === action.payload.body.id) {
            return (transaction = action.payload.body);
          }
          return transaction;
        });
      })
      .addCase(editTransaction.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });

    //! --- DELETE  ---
    builder
      .addCase(deleteTransaction.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.transactions = state.transactions.filter((transaction) => transaction.id !== action.payload.body);
      })
      .addCase(deleteTransaction.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });
  },
});

export default transactionSlice.reducer;
export const selectTransaction = (state: RootState) => state.transaction.transactions;
export const { clearTransactions } = transactionSlice.actions;
