import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATES, commonInitialState } from "../../constants";
import api from "../../../helpers/api";

export const initialState = {
  productsByRestaurantId: {},
};

const productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMenuByRestaurantId.pending, (state, action) => {
      const restaurantId = action.meta.arg;
      state.productsByRestaurantId[restaurantId] =
        Boolean(state.productsByRestaurantId[restaurantId]?.listFetched) ===
        false
          ? {
              ...commonInitialState,
              fetchState: FETCH_STATES.IN_PROGRESS,
              menu: [],
            }
          : {
              ...state.productsByRestaurantId[restaurantId],
              fetchState: FETCH_STATES.IN_PROGRESS,
            };
    });
    builder.addCase(fetchMenuByRestaurantId.fulfilled, (state, action) => {
      const restaurantId = action.meta.arg;
      state.productsByRestaurantId[restaurantId].fetchState =
        FETCH_STATES.COMPLETED;
      state.productsByRestaurantId[restaurantId].menu = action.payload.menus;
      state.productsByRestaurantId[restaurantId].listFetched = true;
    });
    builder.addCase(fetchMenuByRestaurantId.rejected, (state, action) => {
      const restaurantId = action.meta.arg;
      state.productsByRestaurantId[restaurantId].fetchState =
        FETCH_STATES.ERROR;
      state.productsByRestaurantId[restaurantId].error = action.payload;
    });
  },
});

export default productSlice.reducer;

export const fetchMenuByRestaurantId = createAsyncThunk(
  "fetchMenuByRestaurantId",
  async (restaurantId) => {
    try {
      const response = await api.get(`/restaurant/${restaurantId}`);
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);
