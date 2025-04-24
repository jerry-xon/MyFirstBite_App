import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectAddress from "./SelectAddress";
import { FETCH_STATES } from "../redux/constants";
import FullPageLoader from "../components/common/FullPageLoader";
import {
  deleteAddress,
  fetchAddressList,
} from "../redux/reducers/addresses/AddressReducer";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ROUTES } from "../constants/routes";
import { changeSelectedAddress } from "../redux/reducers/cart/cartReducer";

export default function AddresseScreen() {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const addressState = useSelector((state) => state.addressState);
  const [dataFetched, setDataFetched] = useState(false);
  const { addressList, addressListFetchStatus, deleteAddressStatus } =
    addressState;
  const { selectedAddress } = useSelector((state) => state.cartState);
  const { fetchState } = addressListFetchStatus;
  const fetchData = useCallback(() => {
    if (
      fetchState !== FETCH_STATES.IN_PROGRESS &&
      fetchState !== FETCH_STATES.COMPLETED &&
      dataFetched === false
    ) {
      setDataFetched(true);
      dispatch(fetchAddressList());
    }
  }, [fetchState, dataFetched]);

  const handleAddNewAddressClick = useCallback(() => {
    navigation.navigate(ROUTES.ADD_ADDRESS, {
      redirectFrom: route.params?.redirectFrom,
    });
  }, []);

  const handleSelectAddress = useCallback(
    (addressId) => {
      const address = addressList.find((a) => a.delivery_id === addressId);
      dispatch(changeSelectedAddress({ selectedAddress: address.delivery_id }));
      navigation.navigate(route.params?.redirectFrom);
    },
    [addressList]
  );

  const handleDeleteAddress = useCallback((addressId) => {
    dispatch(deleteAddress({ addressId }));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (
    fetchState === FETCH_STATES.NOT_STARTED ||
    fetchState === FETCH_STATES.IN_PROGRESS ||
    deleteAddressStatus.fetchState === FETCH_STATES.IN_PROGRESS
  ) {
    return <FullPageLoader />;
  }

  return (
    <SelectAddress
      showSelectButton={
        (route.params?.redirectFrom === ROUTES.CART ||
          route.params?.redirectFrom === ROUTES.HOME) &&
        addressList.length > 0
      }
      addressList={addressList}
      selectedAddress={selectedAddress}
      onAddAddress={handleAddNewAddressClick}
      onSelect={handleSelectAddress}
      onDelete={handleDeleteAddress}
    />
  );
}
