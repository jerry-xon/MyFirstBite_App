import { createSelector } from "@reduxjs/toolkit";
import { FETCH_STATES } from "../../constants";

export const getRestaurantMenuViewByRestaurantId = createSelector(
  [
    (state) => state.productState,
    (state) => state.restaurantsState.restaurantsList,
    (state) => state.cartState,
    (_, restaurantId) => restaurantId,
  ],
  (productState, restaurantsList, cartState, restaurantId) => {
    const restaurant = restaurantsList.find(
      (vendor) => vendor.user_id === restaurantId
    );
    if (restaurant == null) {
      return {
        restaurant,
        fetchState: FETCH_STATES.NOT_STARTED,
        menu: [],
        error: undefined,
        cartQuantity: {},
        currentCartRestaurantId: cartState.restaurantId,
        listFetched: false,
      };
    }
    if (productState.productsByRestaurantId[restaurantId] == null) {
      return {
        restaurant,
        fetchState: FETCH_STATES.NOT_STARTED,
        menu: [],
        error: undefined,
        cartQuantity: {},
        currentCartRestaurantId: cartState.restaurantId,
        listFetched: false,
      };
    }

    return {
      restaurant,
      fetchState: productState.productsByRestaurantId[restaurantId].fetchState,
      error: productState.productsByRestaurantId[restaurantId].error,
      menu: productState.productsByRestaurantId[restaurantId].menu ?? [],
      listFetched:
        productState.productsByRestaurantId[restaurantId].listFetched ?? false,
      cartQuantity:
        cartState.restaurantId === restaurantId ? cartState.productsList : {},
      currentCartRestaurantId: cartState.restaurantId,
    };
  }
);
