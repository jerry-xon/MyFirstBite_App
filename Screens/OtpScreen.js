import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  getOtp,
  resetAuthFetchStates,
  verfiyOtp,
} from "../redux/reducers/auth/authReducer";
import Otp from "./Otp";
import { FETCH_STATES } from "../redux/constants";
import { ROUTES } from "../constants/routes";

export default function OtpScreen() {
  const dispatch = useDispatch();
  const route = useRoute();
  const navigation = useNavigation();
  const authState = useSelector((state) => state.authState);
  const phoneNumber = authState.userPhoneNumber;
  const [otpText, setOtpText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleOtpChange = useCallback((number) => {
    setOtpText(number);
  }, []);

  const handleLogin = useCallback(() => {
    if (otpText.length !== 6) {
      setErrorMsg("Invalid Otp");
      return;
    }
    dispatch(verfiyOtp({ phoneNumber, otp: otpText }));
  }, [otpText, phoneNumber]);

  const resendOTP = useCallback(() => {
    dispatch(getOtp(phoneNumber));
  }, [phoneNumber]);

  const editNumber = useCallback(() => {
    navigation.navigate(ROUTES.LOGIN);
  }, []);

  useEffect(() => {
    if (authState.otpVerifyStatus.fetchState === FETCH_STATES.COMPLETED) {
      dispatch(resetAuthFetchStates());
      if (route.params?.redirectFrom === ROUTES.CART) {
        navigation.navigate(ROUTES.CART);
      } else {
        navigation.navigate(ROUTES.HOME);
      }
    }
    if (authState.otpVerifyStatus.fetchState === FETCH_STATES.ERROR) {
      setErrorMsg("Invalid Otp");
    }
  }, [authState.otpVerifyStatus.fetchState]);

  return (
    <Otp
      onSubmit={handleLogin}
      otpText={otpText}
      onInputChange={handleOtpChange}
      phoneNumber={phoneNumber}
      editNumber={editNumber}
      resendOTP={resendOTP}
      errorMsg={errorMsg}
      isLoading={
        authState.otpVerifyStatus.fetchState === FETCH_STATES.IN_PROGRESS
      }
    />
  );
}
