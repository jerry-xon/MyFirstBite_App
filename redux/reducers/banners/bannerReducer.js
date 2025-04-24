import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATES, commonInitialState } from "../../constants";
import api from "../../../helpers/api";

export const initialState = {
  bannerList: [],
  bannerListFetchStatus: {
    ...commonInitialState,
  },
};

const bannerSlice = createSlice({
  name: "banner",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchBannersList.pending, (state) => {
      state.bannerListFetchStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(fetchBannersList.fulfilled, (state, action) => {
      state.bannerListFetchStatus.fetchState = FETCH_STATES.COMPLETED;
      state.bannerList = action.payload;
    });
    builder.addCase(fetchBannersList.rejected, (state, action) => {
      state.bannerListFetchStatus.fetchState = FETCH_STATES.ERROR;
      state.bannerListFetchStatus.error = action.payload;
    });
  },
});

export default bannerSlice.reducer;

export const fetchBannersList = createAsyncThunk(
  "fetchBannersList",
  async () => {
    try {
      const response = await api.get(`/banners`);
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);