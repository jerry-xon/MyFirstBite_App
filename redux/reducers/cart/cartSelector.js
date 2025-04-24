import { createSelector } from "@reduxjs/toolkit";
import { getAddressByAddressId } from "../addresses/addressSelector";

export const getCartDetails = createSelector(
  [
    (state) => state.productState,
    (state) => state.restaurantsState.restaurantsList,
    (state) => state.cartState,
    (state) => state.myOrdersState,
    (state) => state.addressState,
  ],
  (productState, restaurantsList, cartState, myOrdersState, addressState) => {
    const { restaurantId, selectedAddress, couponCodeStatus } = cartState;
    const selectedAddressFull = getAddressByAddressId(
      addressState,
      selectedAddress
    );
    const { placeOrderStatus } = myOrdersState;

    if (Object.keys(cartState.productsList).length === 0) {
      return {
        restaurant: null,
        products: [],
        cartQuantity: {},
        selectedAddress: selectedAddressFull,
        placeOrderStatus,
        couponCodeStatus,
      };
    }

    const restaurant = restaurantsList.find(
      (res) => res.user_id === restaurantId
    );

    const restaurantMenu = productState.productsByRestaurantId[restaurantId];
    const restaurantProducts = restaurantMenu.menu
      .map((m) => m.products)
      .flat();

    if (
      restaurant == null ||
      restaurantMenu.menu.length == 0 ||
      restaurantMenu.menu == null
    ) {
      return {
        restaurant: null,
        products: [],
        cartQuantity: {},
        selectedAddress: selectedAddressFull,
        placeOrderStatus,
        couponCodeStatus,
      };
    }

    const productIds = Object.keys(cartState.productsList);

    const products = productIds.map((pId) => {
      return restaurantProducts.find((product) => product.product_id == pId);
    });

    return {
      restaurant,
      products,
      cartQuantity: cartState.productsList,
      selectedAddress: selectedAddressFull,
      placeOrderStatus,
      couponCodeStatus,
    };
  }
);
