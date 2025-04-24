import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATES, commonInitialState } from "../../constants";
import api from "../../../helpers/api";
import { changeSelectedAddress } from "../cart/cartReducer";

export const initialState = {
  addressList: [],
  addressListFetchStatus: {
    ...commonInitialState,
  },
  locationsList: [],
  locationsListFetchStatus: {
    ...commonInitialState,
  },
  addAddressStatus: {
    ...commonInitialState,
  },
  deleteAddressStatus: {
    ...commonInitialState,
  },
};

const addressSlice = createSlice({
  name: "Addresses",
  initialState,
  reducers: {
    updateAddresses(state, action) {
      state.addressList = action.payload;
    },
    resetAddAddressStatus(state) {
      state.addAddressStatus = {
        ...commonInitialState,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAddressList.pending, (state) => {
      state.addressListFetchStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(fetchAddressList.fulfilled, (state, action) => {
      state.addressListFetchStatus.fetchState = FETCH_STATES.COMPLETED;
      state.addressList = action.payload;
    });
    builder.addCase(fetchAddressList.rejected, (state, action) => {
      state.addressListFetchStatus.fetchState = FETCH_STATES.ERROR;
      state.addressListFetchStatus.error = action.payload;
    });

    builder.addCase(fetchLocationsList.pending, (state) => {
      state.locationsListFetchStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(fetchLocationsList.fulfilled, (state, action) => {
      state.locationsListFetchStatus.fetchState = FETCH_STATES.COMPLETED;
      state.locationsList = action.payload;
    });
    builder.addCase(fetchLocationsList.rejected, (state, action) => {
      state.locationsListFetchStatus.fetchState = FETCH_STATES.ERROR;
      state.locationsListFetchStatus.error = action.payload;
    });

    builder.addCase(addAddress.pending, (state) => {
      state.addAddressStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(addAddress.fulfilled, (state, action) => {
      state.addAddressStatus.fetchState = FETCH_STATES.COMPLETED;
      state.addressList = [...state.addressList, action.payload];
    });
    builder.addCase(addAddress.rejected, (state, action) => {
      state.addAddressStatus.fetchState = FETCH_STATES.ERROR;
      state.addAddressStatus.error = action.payload;
    });

    builder.addCase(deleteAddress.pending, (state, action) => {
      state.deleteAddressStatus.fetchState = FETCH_STATES.IN_PROGRESS;
      const { addressId } = action.meta.arg;
      state.addressList = state.addressList.filter(
        (address) => address.delivery_id !== addressId
      );
    });
    builder.addCase(deleteAddress.fulfilled, (state) => {
      state.deleteAddressStatus.fetchState = FETCH_STATES.COMPLETED;
    });
    builder.addCase(deleteAddress.rejected, (state, action) => {
      state.deleteAddressStatus.fetchState = FETCH_STATES.ERROR;
      state.deleteAddressStatus.error = action.payload;
    });
  },
});

export const { updateAddresses, resetAddAddressStatus } = addressSlice.actions;

export default addressSlice.reducer;

export const fetchAddressList = createAsyncThunk(
  "fetchAddressList",
  async () => {
    try {
      const response = await api.get(`/address`);
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);

export const fetchLocationsList = createAsyncThunk(
  "fetchLocationsList",
  async () => {
    try {
      const response = await api.get(`/locations`);
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);

export const addAddress = createAsyncThunk(
  "addAddress",
  async (
    { landmark, phoneNumber, areaValue, address, setAsSelected },
    { dispatch }
  ) => {
    try {
      const payload = {
        delivery_address: address,
        delivery_landmark: landmark,
        delivery_phone: phoneNumber,
        delivery_city: areaValue,
      };
      const response = await api.post(`/address`, payload);
      if (setAsSelected === true) {
        dispatch(
          changeSelectedAddress({ selectedAddress: response.data.delivery_id })
        );
      }
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  "deleteAddress",
  async ({ addressId }) => {
    try {
      const response = await api.delete(`/address/${addressId}`);
      return response.data;
    } catch (err) {
      console.log("MFB-error-logs ~ err:", err);
      throw new Error(err);
    }
  }
);

// const Wait = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve();
//     }, 5000);
//   });
// };
