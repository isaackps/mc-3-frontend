import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  companyDetails: [],
  status: "idle",
};

export const getAllCompanies = createAsyncThunk(
  "company/getAllCompanies",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}:${process.env.REACT_APP_PORT}/api/v1.0/market/company/getall`
    );
    console.log(response);
    return response.data;
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.status = "idle";
        state.companyDetails = action.payload;
      });
  },
});

export const selectCompany = (state) => state.company.companyDetails;

export default companySlice.reducer;
