import { createSelector } from "@reduxjs/toolkit";
import { getAddressByAddressId } from "../addresses/addressSelector";

export const getHomePageView = createSelector(
  [
    (state) => state.restaurantsState,
    (state) => state.cartState,
    (state) => state.addressState,
    (state) => state.myOrdersState,
    (state) => state.menuState,
    (state) => state.bannerState,
    (state) => state.authState,
  ],
  (
    restaurantsState,
    cartState,
    addressState,
    myOrdersState,
    menuState,
    bannerState,
    authState
  ) => {
    const { selectedAddress, productsList } = cartState;
    const { restaurantsList, restaurantListFetchStatus, listFetched } =
      restaurantsState;

    const { activeOrder, activeOrderRider } = myOrdersState;
    const { menuListfetchStatus, menuList } = menuState;
    const { fetchState: menuListFetchState } = menuListfetchStatus;
    const { fetchState, error } = restaurantListFetchStatus;
    const { bannerList, bannerListFetchStatus } = bannerState;
    const { fetchState: bannerListFetchState } = bannerListFetchStatus;

    return {
      selectedAddress:
        selectedAddress != null
          ? getAddressByAddressId(addressState, selectedAddress)
          : null,
      restaurantsList,
      fetchState,
      menuListFetchState,
      menuList,
      error,
      listFetched,
      activeOrder,
      activeOrderRider,
      noOfItemsInTheCart: Object.keys(productsList).length,
      bannerList,
      bannerListFetchState,
      showUserNameModal: authState.showUserNameModal,
      userDetails: authState.user,
    };
  }
);
