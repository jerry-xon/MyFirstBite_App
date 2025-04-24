import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Home from "./Home";
import { FETCH_STATES } from "../redux/constants";
import { fetchRestaurantsList } from "../redux/reducers/restaurants/restaurantsReducer";
import FullPageLoader from "../components/common/FullPageLoader";
import { getHomePageView } from "../redux/reducers/homePage/homePageSelector";
import { ROUTES } from "../constants/routes";
import { clearCart } from "../redux/reducers/cart/cartReducer";
import { isShopOpen } from "../helpers/utils";
import { fetchActiveOrders } from "../redux/reducers/myOrders/myOrdersReducer";
import { fetchMenuList } from "../redux/reducers/menu/menuReducer";
import { fetchBannersList } from "../redux/reducers/banners/bannerReducer";
import {
  hideUserNameModal,
  updateUserDetails,
} from "../redux/reducers/auth/authReducer";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [restaurantsFetched, setRestaurantsFetched] = useState(false);
  const [menuFetched, setMenuFetched] = useState(false);
  const [bannersFetched, setBannersFetched] = useState(false);
  const homePageView = useSelector((state) => getHomePageView(state));
  const {
    restaurantsList,
    fetchState,
    selectedAddress,
    noOfItemsInTheCart,
    listFetched,
    activeOrder,
    activeOrderRider,
    menuListFetchState,
    menuList,
    bannerListFetchState,
    bannerList,
    userDetails,
  } = homePageView;

  const fetchRestaurants = useCallback(() => {
    if (
      fetchState !== FETCH_STATES.IN_PROGRESS &&
      fetchState !== FETCH_STATES.COMPLETED &&
      restaurantsFetched === false
    ) {
      setRestaurantsFetched(true);
      dispatch(fetchRestaurantsList());
    }
  }, [fetchState, restaurantsFetched]);

  const fetchMenu = useCallback(() => {
    if (
      menuListFetchState !== FETCH_STATES.IN_PROGRESS &&
      menuListFetchState !== FETCH_STATES.COMPLETED &&
      menuFetched === false
    ) {
      setMenuFetched(true);
      dispatch(fetchMenuList());
    }
  }, [menuListFetchState, menuFetched]);

  const fetchBanners = useCallback(() => {
    if (
      bannerListFetchState !== FETCH_STATES.IN_PROGRESS &&
      bannerListFetchState !== FETCH_STATES.COMPLETED &&
      bannersFetched === false
    ) {
      setBannersFetched(true);
      dispatch(fetchBannersList());
    }
  }, [bannersFetched, bannerListFetchState]);

  const handleNavigationToCartPage = useCallback(() => {
    navigation.navigate(ROUTES.CART);
  }, []);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, []);

  const handleRefresh = useCallback(() => {
    dispatch(fetchRestaurantsList());
    dispatch(fetchMenuList());
    dispatch(fetchBannersList());
    dispatch(fetchActiveOrders());
  }, []);

  useEffect(() => {
    fetchRestaurants();
    fetchMenu();
    fetchBanners();
  }, [fetchRestaurants, fetchMenu, fetchBanners]);

  useEffect(() => {
    dispatch(fetchActiveOrders());
  }, []);

  const handleUserNameSave = useCallback(
    (userName) => {
      dispatch(
        updateUserDetails({
          formData: {
            name: userName,
            email: userDetails.user_email,
            primaryMobile: userDetails.user_phone,
            secondaryMobile: userDetails.user_phone_1,
          },
        })
      );
      dispatch(hideUserNameModal());
    },
    [userDetails]
  );

  const sortedRestaurantsList = useMemo(() => {
    const closedRestaurants = [];
    const openRestaurants = restaurantsList.filter((restaurant) => {
      const isRestroOpen = isShopOpen(restaurant);
      if (isRestroOpen === false) {
        closedRestaurants.push(restaurant);
      }
      return isRestroOpen;
    });
    return [...openRestaurants, ...closedRestaurants];
  }, [restaurantsList]);

  if (
    (fetchState === FETCH_STATES.NOT_STARTED ||
      fetchState === FETCH_STATES.IN_PROGRESS ||
      menuListFetchState === FETCH_STATES.NOT_STARTED ||
      menuListFetchState === FETCH_STATES.IN_PROGRESS) &&
    listFetched === false
  ) {
    return <FullPageLoader />;
  }

  return (
    <Home
      noOfItemsInTheCart={noOfItemsInTheCart}
      selectedAddress={selectedAddress}
      restaurantsList={sortedRestaurantsList}
      fetchState={fetchState}
      activeOrder={activeOrder}
      activeOrderRider={activeOrderRider}
      menuList={menuList}
      bannerList={bannerList}
      showUserNameModal={homePageView.showUserNameModal}
      onNavigateToCartPage={handleNavigationToCartPage}
      onClearCart={handleClearCart}
      onRefresh={handleRefresh}
      onUserNameSave={handleUserNameSave}
    />
  );
}
