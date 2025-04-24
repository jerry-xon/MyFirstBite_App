import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import RestroMenu from "./RestroMenu";
import { useCallback, useEffect, useState } from "react";
import { ROUTES } from "../constants/routes";
import { fetchMenuByRestaurantId } from "../redux/reducers/products/productsReducer";
import { FETCH_STATES } from "../redux/constants";
import FullPageLoader from "../components/common/FullPageLoader";
import { getRestaurantMenuViewByRestaurantId } from "../redux/reducers/products/productsSelector";
import {
  addProductToCart,
  clearCart,
  decrementProductQuantity,
  incrementProductQuantity,
} from "../redux/reducers/cart/cartReducer";

export default function RestroMenuScreen() {
  const [dataFetched, setDataFetched] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();

  const restaurantId = route.params?.restaurantId;
  const menuView = useSelector((state) =>
    getRestaurantMenuViewByRestaurantId(state, restaurantId)
  );

  const { restaurant } = menuView;

  const fetchMenu = useCallback(() => {
    if (
      menuView.fetchState !== FETCH_STATES.IN_PROGRESS &&
      menuView.fetchState !== FETCH_STATES.COMPLETED &&
      dataFetched === false &&
      restaurantId != null
    ) {
      setDataFetched(true);
      dispatch(fetchMenuByRestaurantId(restaurantId));
    }
  }, [menuView, restaurantId, dataFetched]);

  const handleAddProductToCart = useCallback(
    (product) => {
      if (restaurantId != null) {
        dispatch(
          addProductToCart({ restaurantId, productId: product.product_id })
        );
      }
    },
    [restaurantId]
  );

  const handleIncrementProductQuantity = useCallback((product) => {
    dispatch(incrementProductQuantity({ productId: product.product_id }));
  }, []);

  const handleDecrementProductQuantity = useCallback((product) => {
    dispatch(decrementProductQuantity({ productId: product.product_id }));
  }, []);

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, []);

  const handleRefresh = useCallback(() => {
    if (restaurantId != null) {
      dispatch(fetchMenuByRestaurantId(restaurantId));
    }
  }, [restaurantId]);

  useEffect(() => {
    if (restaurant == null) {
      navigation.navigate(ROUTES.HOME);
    } else {
      fetchMenu();
    }
  }, [restaurant, fetchMenu]);

  if (restaurant == null) {
    return null;
  }

  if (
    (menuView.fetchState === FETCH_STATES.NOT_STARTED ||
      menuView.fetchState === FETCH_STATES.IN_PROGRESS) &&
    menuView.listFetched === false
  ) {
    return <FullPageLoader />;
  }

  return (
    <RestroMenu
      menuView={menuView}
      fetchState={menuView.fetchState}
      onRefresh={handleRefresh}
      onClearCart={handleClearCart}
      onAddProductToCart={handleAddProductToCart}
      onIncrementProductQuantity={handleIncrementProductQuantity}
      onDecrementProductQuantity={handleDecrementProductQuantity}
    />
  );
}
