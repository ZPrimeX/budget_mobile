import { createSlice } from "@reduxjs/toolkit";
import { REDUX_STATUS } from "../../types/common.types";
import { createWallet, deleteWallet, editWallet, fetchWallets, findWallet } from "./walletThunk";
import { RootState } from "../store";

interface Wallet {
  id: string;
  title: string;
  balance: number;
}

interface InitState {
  wallets: Wallet[];
  current: Wallet | undefined;
  status: REDUX_STATUS;
}

const initialState: InitState = {
  wallets: [],
  current: undefined,
  status: REDUX_STATUS.idle,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    changeWallet: (state, action) => {
      state.current = state.wallets.find((w) => w.id === action.payload);
    },
  },
  extraReducers(builder) {
    //* --- CREATE ---
    builder
      .addCase(createWallet.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(createWallet.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        if (state.wallets.length === 0) {
          state.current = action.payload.body;
        }
        state.wallets = [...state.wallets, action.payload.body];
      })
      .addCase(createWallet.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });

    //* --- FETCH ---

    builder
      .addCase(fetchWallets.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(fetchWallets.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.wallets = action.payload.body;
        state.current = action.payload.body.at(0);
      })
      .addCase(fetchWallets.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });

    //? --- EDIT ---
    builder
      .addCase(editWallet.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(editWallet.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.wallets = state.wallets.map((wallet) => {
          if (wallet.id === action.payload.body.id) {
            return (wallet = action.payload.body);
          }
          return wallet;
        });
      })
      .addCase(editWallet.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });

    //! --- DELETE ---
    builder
      .addCase(deleteWallet.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(deleteWallet.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.wallets = state.wallets.filter((wallet) => {
          wallet.id !== action.payload.body;
        });
      })
      .addCase(deleteWallet.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });

    //* --- FIND ONE WALLET ---

    builder
      .addCase(findWallet.pending, (state) => {
        state.status = REDUX_STATUS.pending;
      })
      .addCase(findWallet.fulfilled, (state, action) => {
        state.status = REDUX_STATUS.fulfilled;
        state.current = action.payload.body;
        state.wallets = state.wallets.map((w) => {
          if (w.id === action.payload.body.id) {
            return (w = action.payload.body);
          }
          return w;
        });
      })
      .addCase(findWallet.rejected, (state) => {
        state.status = REDUX_STATUS.rejected;
      });
  },
});

export default walletSlice.reducer;

export const { changeWallet } = walletSlice.actions;

export const selectWallet = (state: RootState) => state.wallet.wallets;
export const selectCurrentWallet = (state: RootState) => state.wallet.current;
