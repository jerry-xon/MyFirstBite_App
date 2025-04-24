import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATES, commonInitialState } from "../../constants";
import { TOKEN_KEY } from "../../../constants/token";
import {
  getItemFromAsyncStorage,
  removeItemFromAsyncStorage,
  storeItemInAsyncStorage,
} from "../../../helpers/asyncStorage";
import api from "../../../helpers/api";
import { changeSelectedAddress } from "../cart/cartReducer";
import { updateAddresses } from "../addresses/AddressReducer";

export const initialState = {
  user: undefined,
  isUserAuthenticated: null,
  userPhoneNumber: undefined,
  showUserNameModal: false,
  otpSendStatus: {
    ...commonInitialState,
  },
  otpVerifyStatus: {
    ...commonInitialState,
  },
  updateUserDetailsStatus: {
    ...commonInitialState,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserOnLoginSuccess(state, action) {
      state.user = action.payload.user;
    },
    updatePhoneNumber(state, action) {
      state.userPhoneNumber = action.payload;
    },
    resetAuthFetchStates(state) {
      state.otpSendStatus = {
        ...commonInitialState,
      };
      state.otpVerifyStatus = {
        ...commonInitialState,
      };
    },
    setUserAuthenticationStatus(state, action) {
      state.isUserAuthenticated = action.payload;
    },
    hideUserNameModal(state, action) {
      state.showUserNameModal = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOtp.pending, (state) => {
      state.otpSendStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(getOtp.fulfilled, (state, action) => {
      state.otpSendStatus.fetchState = FETCH_STATES.COMPLETED;
    });
    builder.addCase(getOtp.rejected, (state, action) => {
      state.otpSendStatus.fetchState = FETCH_STATES.ERROR;
      state.otpSendStatus.error = action.payload;
    });
    builder.addCase(verfiyOtp.pending, (state) => {
      state.otpVerifyStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(verfiyOtp.fulfilled, (state, action) => {
      state.otpVerifyStatus.fetchState = FETCH_STATES.COMPLETED;
      state.user = action.payload.user;
      if (Boolean(state.user.user_name) === false) {
        state.showUserNameModal = true;
      }
      state.isUserAuthenticated = true;
    });
    builder.addCase(verfiyOtp.rejected, (state, action) => {
      state.otpVerifyStatus.fetchState = FETCH_STATES.ERROR;
      state.otpVerifyStatus.error = action.payload;
    });
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.isUserAuthenticated = true;
      state.user = action.payload;
      state.userPhoneNumber = action.payload.user_phone;
    });
    builder.addCase(getUserDetails.rejected, (state) => {
      state.isUserAuthenticated = false;
      state.user = undefined;
    });
    builder.addCase(updateUserDetails.pending, (state) => {
      state.updateUserDetailsStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(updateUserDetails.fulfilled, (state, action) => {
      state.updateUserDetailsStatus.fetchState = FETCH_STATES.COMPLETED;
      state.user = {
        lastOrderAddress: { ...state.user.lastOrderAddress },
        ...action.payload.user,
      };
    });
    builder.addCase(updateUserDetails.rejected, (state, action) => {
      state.updateUserDetailsStatus.fetchState = FETCH_STATES.ERROR;
      state.updateUserDetailsStatus.error = action.payload;
    });
  },
});

export const {
  updateUserOnLoginSuccess,
  updatePhoneNumber,
  resetAuthFetchStates,
  setUserAuthenticationStatus,
  hideUserNameModal
} = authSlice.actions;
export default authSlice.reducer;

export const getOtp = createAsyncThunk(
  "getOtp",
  async (phoneNumber, { dispatch }) => {
    try {
      dispatch(updatePhoneNumber(phoneNumber));
      const response = await api.post(`/auth/get-otp`, {
        phone_number: phoneNumber,
      });
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);

export const verfiyOtp = createAsyncThunk(
  "verifyOtp",
  async ({ phoneNumber, otp }, { dispatch }) => {
    try {
      const response = await api.post(`/auth/verify-otp`, {
        phone_number: phoneNumber,
        user_otp: otp,
      });
      await storeItemInAsyncStorage(TOKEN_KEY, response.data.token);
      if (response.data.user.lastOrderAddress?.delivery_id != null) {
        dispatch(
          changeSelectedAddress({
            selectedAddress: response.data.user.lastOrderAddress?.delivery_id,
          })
        );
        dispatch(updateAddresses([response.data.user.lastOrderAddress]));
      }
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (_, { dispatch }) => {
    try {
      const response = await api.get(`/user`);
      if (response.data.lastOrderAddress?.delivery_id != null) {
        dispatch(
          changeSelectedAddress({
            selectedAddress: response.data.lastOrderAddress?.delivery_id,
          })
        );
        dispatch(updateAddresses([response.data.lastOrderAddress]));
      }
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ getUserDetails ~ err:", err);
      await removeItemFromAsyncStorage(TOKEN_KEY);
      throw new Error(err);
    }
  }
);

export const initializeAuth = createAsyncThunk(
  "initializeAuth",
  async (_, { dispatch }) => {
    try {
      // await removeItemFromAsyncStorage(TOKEN_KEY);
      const token = await getItemFromAsyncStorage(TOKEN_KEY);
      dispatch(setUserAuthenticationStatus(Boolean(token)));
      if (Boolean(token)) {
        dispatch(getUserDetails());
      }
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      dispatch(setUserAuthenticationStatus(false));
      return err;
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "updateUserDetails",
  async ({ formData }) => {
    try {
      const response = await api.post(`/user`, {
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.primaryMobile,
        user_phone_1: formData.secondaryMobile,
      });
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ updateUserDetails ~ err:", err);
      throw new Error(err);
    }
  }
);
