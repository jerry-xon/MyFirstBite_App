import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import LoginPage from "../components/Login";
import { getOtp } from "../redux/reducers/auth/authReducer";
import { ROUTES } from "../constants/routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE_KEYS } from "../constants/CityKey";
import { clearStoredCity } from "../helpers/CityStorage";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [hasError, setHasError] = useState(false);

  const handlePhoneChange = useCallback((number) => {
    setPhoneNumber(number);
  }, []);

  const handleLogin = useCallback(() => {
    if (phoneNumber.length !== 10) {
      setHasError(true);
      return;
    }
    navigation.navigate(ROUTES.OTP, {
      redirectFrom: route.params?.redirectFrom,
    });
    dispatch(getOtp(phoneNumber));
  }, [phoneNumber]);

  const handleLoginSkip = useCallback(async () => {
    // clearStoredCity();
    const selectedCity = await AsyncStorage.getItem(STORAGE_KEYS.CITY);
    // console.log("Selected City:", selectedCity);

    if (selectedCity) {
      navigation.replace(ROUTES.HOME);
    } else {
      navigation.replace(ROUTES.CHOOSE_CITY);
    }
  }, []);

  const navigateToTnCPage = useCallback(() => {
    navigation.navigate(ROUTES.TNC);
  }, []);

  useFocusEffect(
    useCallback(() => {
      const unsubscribe = () => {
        setPhoneNumber("");
        setHasError(false);
      };
      return () => unsubscribe();
    }, [])
  );

  return (
    <LoginPage
      onSubmit={handleLogin}
      phoneNumber={phoneNumber}
      onInputChange={handlePhoneChange}
      hasError={hasError}
      onLoginSkip={handleLoginSkip}
      navigateToTnCPage={navigateToTnCPage}
    />
  );
}
