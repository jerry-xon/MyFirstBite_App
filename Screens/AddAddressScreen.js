import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import AddAddress from "./AddAddress";
import { FETCH_STATES } from "../redux/constants";
import {
  addAddress,
  fetchLocationsList,
  resetAddAddressStatus,
} from "../redux/reducers/addresses/AddressReducer";
import FullPageLoader from "../components/common/FullPageLoader";
import { ROUTES } from "../constants/routes";

export default function AddAddressScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const [dataFetched, setDataFetched] = useState(false);
  const { locationsListFetchStatus, locationsList, addAddressStatus } =
    useSelector((state) => state.addressState);
  const { fetchState } = locationsListFetchStatus;

  const fetchData = useCallback(() => {
    if (
      fetchState !== FETCH_STATES.IN_PROGRESS &&
      fetchState !== FETCH_STATES.COMPLETED &&
      dataFetched === false
    ) {
      setDataFetched(true);
      dispatch(fetchLocationsList());
    }
  }, [fetchState, dataFetched]);

  const handleSave = useCallback(
    ({ address, landmark, phoneNumber, areaValue }) => {
      dispatch(
        addAddress({
          address,
          landmark,
          phoneNumber,
          areaValue,
          setAsSelected:
            route.params?.redirectFrom === ROUTES.CART ||
            route.params?.redirectFrom === ROUTES.HOME,
        })
      );
    },
    []
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (addAddressStatus.fetchState === FETCH_STATES.COMPLETED) {
      dispatch(resetAddAddressStatus());
      navigation.navigate(route.params?.redirectFrom ?? ROUTES.SELECT_ADDRESS);
    }
  }, [addAddressStatus.fetchState]);

  if (
    fetchState === FETCH_STATES.NOT_STARTED ||
    fetchState === FETCH_STATES.IN_PROGRESS
  ) {
    return <FullPageLoader />;
  }

  return (
    <AddAddress
      isLoading={addAddressStatus.fetchState === FETCH_STATES.IN_PROGRESS}
      onSave={handleSave}
      locationsList={locationsList}
    />
  );
}
