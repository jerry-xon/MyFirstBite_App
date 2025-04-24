import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATES, commonInitialState } from "../../constants";
import api from "../../../helpers/api";

export const initialState = {
  restaurantsList: [],
  listFetched: false,
  restaurantListFetchStatus: {
    ...commonInitialState,
  },
};

const restaurantSlice = createSlice({
  name: "restaurant",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRestaurantsList.pending, (state) => {
      state.restaurantListFetchStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(fetchRestaurantsList.fulfilled, (state, action) => {
      state.restaurantListFetchStatus.fetchState = FETCH_STATES.COMPLETED;
      state.restaurantsList = action.payload;
      state.listFetched = true;
    });
    builder.addCase(fetchRestaurantsList.rejected, (state, action) => {
      state.restaurantListFetchStatus.fetchState = FETCH_STATES.ERROR;
      state.restaurantListFetchStatus.error = action.payload;
    });
  },
});

export default restaurantSlice.reducer;

export const fetchRestaurantsList = createAsyncThunk(
  "fetchRestaurantsList",
  async () => {
    try {
      const response = await api.get(`/restaurant`);
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);
