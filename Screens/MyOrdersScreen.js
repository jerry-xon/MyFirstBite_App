import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import MyOrders from "./MyOrders";
import { FETCH_STATES } from "../redux/constants";
import FullPageLoader from "../components/common/FullPageLoader";
import { fetchMyOrdersList } from "../redux/reducers/myOrders/myOrdersReducer";
import { initilizeCartFromOrdersPage } from "../redux/reducers/cart/cartReducer";
import { ROUTES } from "../constants/routes";
import { fetchMenuByRestaurantId } from "../redux/reducers/products/productsReducer";

export default function MyOrdersScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [reOrderState, setReOrderState] = useState(null);
  const myOrdersState = useSelector((state) => state.myOrdersState);
  const { productsByRestaurantId } = useSelector((state) => state.productState);
  const [dataFetched, setDataFetched] = useState(false);
  const { ordersList, ordersListFetchStatus } = myOrdersState;
  const { fetchState } = ordersListFetchStatus;
  const fetchData = useCallback(() => {
    if (
      fetchState !== FETCH_STATES.IN_PROGRESS &&
      fetchState !== FETCH_STATES.COMPLETED &&
      dataFetched === false
    ) {
      setDataFetched(true);
      dispatch(fetchMyOrdersList());
    }
  }, [fetchState, dataFetched]);

  const handleReOrder = useCallback(
    (order) => {
      if (reOrderState != null) {
        return false;
      }
      if (
        productsByRestaurantId[order.business.user_id.toString()]
          ?.fetchState === FETCH_STATES.COMPLETED
      ) {
        const productsList = order.store_orders_details.reduce((prev, curr) => {
          if (curr.product_qty > 0) {
            return {
              ...prev,
              [curr.product_id]: curr.product_qty,
            };
          } else {
            return {
              ...prev,
            };
          }
        }, {});
        dispatch(
          initilizeCartFromOrdersPage({
            productsList,
            restaurantId: order.business.user_id,
          })
        );
        navigation.navigate(ROUTES.CART);
      } else {
        setReOrderState(order);
        dispatch(fetchMenuByRestaurantId(order.business.user_id));
      }
    },
    [productsByRestaurantId, reOrderState]
  );

  useEffect(() => {
    if (
      reOrderState != null &&
      productsByRestaurantId[reOrderState.business.user_id.toString()]
        ?.fetchState === FETCH_STATES.COMPLETED
    ) {
      const productsList = reOrderState.store_orders_details.reduce(
        (prev, curr) => {
          if (curr.product_qty > 0) {
            return {
              ...prev,
              [curr.product_id]: curr.product_qty,
            };
          } else {
            return {
              ...prev,
            };
          }
        },
        {}
      );
      dispatch(
        initilizeCartFromOrdersPage({
          productsList,
          restaurantId: reOrderState.business.user_id,
        })
      );
      navigation.navigate(ROUTES.CART);
      setReOrderState(null);
    }
  }, [reOrderState, productsByRestaurantId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (
    fetchState === FETCH_STATES.NOT_STARTED ||
    fetchState === FETCH_STATES.IN_PROGRESS
  ) {
    return <FullPageLoader />;
  }

  return (
    <MyOrders
      reOrderState={reOrderState}
      onReOrder={handleReOrder}
      ordersList={ordersList}
    />
  );
}
