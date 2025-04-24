import { useCallback, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import { getCartDetails } from "../redux/reducers/cart/cartSelector";
import {
  clearCart,
  clearCoupon,
  decrementProductQuantity,
  fetchCouponCodeDetails,
  incrementProductQuantity,
} from "../redux/reducers/cart/cartReducer";
import { ROUTES } from "../constants/routes";
import {
  placeOrder,
  resetPlaceOrderStatus,
} from "../redux/reducers/myOrders/myOrdersReducer";
import { FETCH_STATES } from "../redux/constants";
import { Platform } from "react-native";

export default function CartScreen() {
  const cartView = useSelector((state) => getCartDetails(state));
  const authState = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const goToRestaurantPage = useCallback(() => {
    navigation.navigate(ROUTES.RESTRO_MENU, {
      restaurantId: cartView.restaurant.user_id,
    });
  }, [cartView.restaurant?.user_id]);

  const navigateToLoginPage = useCallback(() => {
    navigation.navigate(ROUTES.LOGIN, {
      redirectFrom: ROUTES.CART,
    });
  }, []);

  const handleIncrementProductQuantity = useCallback((productId) => {
    dispatch(incrementProductQuantity({ productId }));
  }, []);

  const handleDecrementProductQuantity = useCallback((productId) => {
    dispatch(decrementProductQuantity({ productId }));
  }, []);

  const handleCheckout = useCallback(() => {
    navigation.navigate(ROUTES.SELECT_ADDRESS, {
      redirectFrom: ROUTES.CART,
    });
  }, []);

  const handlePlaceOrder = useCallback(
    async (coupon_code) => {
      dispatch(
        placeOrder({
          business_user_id: cartView.restaurant?.user_id,
          address_id: cartView.selectedAddress.delivery_id,
          product_ids_with_quantity: cartView.cartQuantity,
          coupon_code,
          platform: Platform.OS,
        })
      );
    },
    [cartView]
  );

  const handleApplyCouponCode = useCallback((code, orderAmount) => {
    dispatch(
      fetchCouponCodeDetails({
        code,
        order_amount: orderAmount,
        platform: Platform.OS,
      })
    );
  }, []);

  const onClearCoupon = useCallback(() => {
    dispatch(clearCoupon());
  }, []);

  useEffect(() => {
    if (cartView.placeOrderStatus.fetchState === FETCH_STATES.COMPLETED) {
      dispatch(clearCart());
      dispatch(resetPlaceOrderStatus());
      navigation.navigate(ROUTES.SUCCESS);
    }
  }, [cartView.placeOrderStatus.fetchState]);

  useEffect(() => {
    dispatch(clearCoupon());
  }, []);

  return (
    <Cart
      cartView={cartView}
      isUserLoggedIn={authState.isUserAuthenticated}
      onCheckout={handleCheckout}
      navigateToLoginPage={navigateToLoginPage}
      handleRedirectToRestaurantPage={goToRestaurantPage}
      onIncrementProductQuantity={handleIncrementProductQuantity}
      onDecrementProductQuantity={handleDecrementProductQuantity}
      onPlaceOrder={handlePlaceOrder}
      onApplyCouponCode={handleApplyCouponCode}
      onClearCoupon={onClearCoupon}
    />
  );
}
