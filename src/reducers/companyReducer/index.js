import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { endpointApiUrl } from "../../utils";

const initialState = {
  allCompanies: [],
  status: "idle",
  registerCompanyStatus: "idle",
  registerCompanyErrorMsg: "",
  deletingCompanyStatus: "idle",
  deletingCompanyErrorMsg: "",
  whichCompanyCodeToDelete: 0,
  search: "",
};

export const getAllCompanies = createAsyncThunk(
  "company/getAllCompanies",
  async () => {
    const response = await axios.get(`${endpointApiUrl}company/getall`);
    return response.data;
  }
);

export const registerCompany = createAsyncThunk(
  "company/registerCompany",
  async (companyDetail, { rejectWithValue }) => {
    try {
      await axios.post(`${endpointApiUrl}company/register`, companyDetail);
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "company/deleteCompany",
  async (companyCode, { rejectWithValue }) => {
    try {
      await axios.delete(`${endpointApiUrl}company/delete/${companyCode}`);
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    } finally {
      const response = await axios.get(`${endpointApiUrl}company/getall`);
      return response.data;
    }
  }
);

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    updateDeletingCompanyCode: (state, action) => {
      state.whichCompanyCodeToDelete = action.payload;
    },
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCompanies.fulfilled, (state, action) => {
        state.status = "idle";
        state.allCompanies = action.payload;
      })
      .addCase(registerCompany.pending, (state) => {
        state.registerCompanyStatus = "loading";
      })
      .addCase(registerCompany.rejected, (state, action) => {
        state.registerCompanyStatus = "error";
        state.registerCompanyErrorMsg = action.payload;
      })
      .addCase(registerCompany.fulfilled, (state) => {
        state.registerCompanyStatus = "idle";
      })
      .addCase(deleteCompany.pending, (state) => {
        state.deletingCompanyStatus = "loading";
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.deletingCompanyStatus = "idle";
        state.allCompanies = action.payload;
        state.whichCompanyCodeToDelete = 0;
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.deletingCompanyStatus = "error";
        state.deletingCompanyErrorMsg = action.payload;
        state.whichCompanyCodeToDelete = 0;
      });
  },
});

export const { updateDeletingCompanyCode, updateSearch } = companySlice.actions;

export const allCompanyDetails = (state) => state.companies.allCompanies;

export const status = (state) => state.companies.status;

export const getSearchValue = (state) => state.companies.search;

export const getDeletingCompanyCode = (state) =>
  state.companies.whichCompanyCodeToDelete;

export default companySlice.reducer;
