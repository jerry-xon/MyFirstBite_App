import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_STATES, commonInitialState } from "../../constants";
import api from "../../../helpers/api";

export const initialState = {
  menuList: [],
  menuListfetchStatus: {
    ...commonInitialState,
  },
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchMenuList.pending, (state) => {
      state.menuListfetchStatus.fetchState = FETCH_STATES.IN_PROGRESS;
    });
    builder.addCase(fetchMenuList.fulfilled, (state, action) => {
      state.menuListfetchStatus.fetchState = FETCH_STATES.COMPLETED;
      state.menuList = action.payload;
    });
    builder.addCase(fetchMenuList.rejected, (state, action) => {
      state.menuListfetchStatus.fetchState = FETCH_STATES.ERROR;
      state.menuListfetchStatus.error = action.payload;
    });
  },
});

export default menuSlice.reducer;

export const fetchMenuList = createAsyncThunk("fetchMenuList", async () => {
  try {
    const response = await api.get(`/menu`);
    return response.data;
  } catch (err) {
    console.log("MFB-error-logs ~ err:", err);
    throw new Error(err);
  }
});