import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commonInitialState, FETCH_STATES } from "../../constants";
import api from "../../../helpers/api";

const initialCouponCodeStatus = {
  ...commonInitialState,
  valid: false,
  success: false,
  discount: 0,
  message: "",
  freeDelivery: false,
};

export const initialState = {
  restaurantId: undefined,
  productsList: {},
  selectedAddress: null,
  couponCodeStatus: { ...initialCouponCodeStatus },
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const { restaurantId, productId } = action.payload;
      if (restaurantId !== state.restaurantId) {
        state.restaurantId = restaurantId;
        state.productsList = {
          [productId]: 1,
        };
      } else {
        state.productsList[productId] = 1;
      }
      state.restaurantId = restaurantId;
      state.couponCodeStatus = { ...initialCouponCodeStatus };
    },
    incrementProductQuantity(state, action) {
      const { productId } = action.payload;
      state.productsList[productId]++;
      state.couponCodeStatus = { ...initialCouponCodeStatus };
    },
    decrementProductQuantity(state, action) {
      const { productId } = action.payload;
      if (state.productsList[productId] === 1) {
        delete state.productsList[productId];
      } else {
        state.productsList[productId]--;
      }
      state.couponCodeStatus = { ...initialCouponCodeStatus };
    },
    changeSelectedAddress(state, action) {
      const { selectedAddress } = action.payload;
      state.selectedAddress = selectedAddress;
    },
    initilizeCartFromOrdersPage(state, action) {
      const { productsList, restaurantId } = action.payload;
      state.productsList = productsList;
      state.restaurantId = restaurantId;
      state.couponCodeStatus = { ...initialCouponCodeStatus };
    },
    clearCoupon(state, action) {
      state.couponCodeStatus = {
        ...initialCouponCodeStatus,
      };
    },
    clearCart(state) {
      state.restaurantId = undefined;
      state.productsList = {};
      state.couponCodeStatus = {
        ...initialCouponCodeStatus,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCouponCodeDetails.pending, (state) => {
      state.couponCodeStatus = {
        ...initialCouponCodeStatus,
        fetchState: FETCH_STATES.IN_PROGRESS,
        error: undefined,
      };
    });
    builder.addCase(fetchCouponCodeDetails.fulfilled, (state, action) => {
      state.couponCodeStatus = {
        ...action.payload,
        fetchState: FETCH_STATES.COMPLETED,
        error: undefined,
      };
    });
    builder.addCase(fetchCouponCodeDetails.rejected, (state, action) => {
      state.couponCodeStatus = {
        ...initialCouponCodeStatus,
        fetchState: FETCH_STATES.ERROR,
        error: "error",
      };
    });
  },
});

export const {
  addProductToCart,
  incrementProductQuantity,
  decrementProductQuantity,
  changeSelectedAddress,
  initilizeCartFromOrdersPage,
  clearCart,
  clearCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;

export const fetchCouponCodeDetails = createAsyncThunk(
  "fetchCouponCodeDetails",
  async (payload) => {
    try {
      const response = await api.post(`/coupon`, payload);
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ fetchCouponCodeDetails ~ err:", err);
      throw new Error(err);
    }
  }
);
