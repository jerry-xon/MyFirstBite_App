import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice, {
  initialState as initialAuthState,
} from "./reducers/auth/authReducer";
import restaurantsSlice from "./reducers/restaurants/restaurantsReducer";
import productSlice from "./reducers/products/productsReducer";
import cartSlice from "./reducers/cart/cartReducer";
import myOrdersSlice, {
  initialState as initialMyOrdersState,
} from "./reducers/myOrders/myOrdersReducer";
import addressSlice, {
  initialState as initialAddAddressState,
} from "./reducers/addresses/AddressReducer";
import menuSlice from "./reducers/menu/menuReducer";
import bannerSlice from "./reducers/banners/bannerReducer";

const combinedReducer = combineReducers({
  authState: authSlice,
  restaurantsState: restaurantsSlice,
  productState: productSlice,
  cartState: cartSlice,
  myOrdersState: myOrdersSlice,
  addressState: addressSlice,
  menuState: menuSlice,
  bannerState: bannerSlice,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET") {
    state = {
      authState: {
        ...initialAuthState,
        isUserAuthenticated: false,
      },
      restaurantsState: state.restaurantsState,
      productState: state.productState,
      cartState: state.cartState,
      bannerState: state.bannerState,
      menuState: state.menuState,
      myOrdersState: { ...initialMyOrdersState },
      addressState: { ...initialAddAddressState },
    };
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});
