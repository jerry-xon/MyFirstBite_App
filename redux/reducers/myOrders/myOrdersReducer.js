import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATES, commonInitialState } from "../../constants";
import api from "../../../helpers/api";

export const initialState = {
  ordersList: [],
  ordersListFetchStatus: {
    ...commonInitialState,
  },
  placeOrderStatus: {
    ...commonInitialState,
  },
  activeOrder: null,
  activeOrderRider: null,
};

const myOrdersSlice = createSlice({
  name: "myOrders",
  initialState,
  reducers: {
    resetPlaceOrderStatus(state) {
      state.placeOrderStatus = {
        ...commonInitialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyOrdersList.pending, (state) => {
      state.ordersListFetchStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(fetchMyOrdersList.fulfilled, (state, action) => {
      state.ordersListFetchStatus.fetchState = FETCH_STATES.COMPLETED;
      state.ordersList = action.payload;
    });
    builder.addCase(fetchMyOrdersList.rejected, (state, action) => {
      state.ordersListFetchStatus.fetchState = FETCH_STATES.ERROR;
      state.ordersListFetchStatus.error = action.payload;
    });

    builder.addCase(placeOrder.pending, (state) => {
      state.placeOrderStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(placeOrder.fulfilled, (state, action) => {
      state.placeOrderStatus.fetchState = FETCH_STATES.COMPLETED;
      state.ordersList = [action.payload.order, ...state.ordersList];
    });
    builder.addCase(placeOrder.rejected, (state, action) => {
      state.placeOrderStatus.fetchState = FETCH_STATES.ERROR;
      state.placeOrderStatus.error = action.payload;
    });
    builder.addCase(fetchActiveOrders.pending, (state) => {
      state.activeOrder = null;
      state.activeOrderRider = null;
    });
    builder.addCase(fetchActiveOrders.fulfilled, (state, action) => {
      state.activeOrder = action.payload.order;
      state.activeOrderRider = action.payload.rider;
    });
  },
});

export const { resetPlaceOrderStatus } = myOrdersSlice.actions;

export default myOrdersSlice.reducer;

export const fetchMyOrdersList = createAsyncThunk(
  "fetchMyOrdersList",
  async () => {
    try {
      const response = await api.get(`/user/orders`);
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);

export const placeOrder = createAsyncThunk("placeOrder", async (payload) => {
  try {
    const response = await api.post(`/user/create-order`, payload);
    return response.data;
  } catch (err) {
    console.log("MFB-error-logs ~ err:", err);
    throw new Error(err);
  }
});

export const fetchActiveOrders = createAsyncThunk(
  "fetchActiveOrders",
  async () => {
    try {
      const response = await api.get(`/user/active-orders`);
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);
