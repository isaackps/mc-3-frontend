import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { endpointApiUrl } from "../../utils";
import { getAllCompanies } from "../companyReducer";

const initialState = {
  companyCode: 0,
};

export const addStockPrice = createAsyncThunk(
  "stock/addStockPrice",
  async (stockPrice, { rejectWithValue, getState, dispatch }) => {
    const state = getState();
    try {
      await axios.post(
        `${endpointApiUrl}stock/add/${state.stocks.companyCode}`,
        { price: stockPrice }
      );
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    } finally {
      dispatch(getAllCompanies());
    }
  }
);

export const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    updateCompanyCode: (state, action) => {
      state.companyCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addStockPrice.fulfilled, (state) => {
      state.companyCode = 0;
      state.stockPrice = 0;
    });
  },
});

export const { updateCompanyCode } = stockSlice.actions;

export default stockSlice.reducer;
