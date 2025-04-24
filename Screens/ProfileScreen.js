import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Profile from "./Profile";
import { TOKEN_KEY } from "../constants/token";
import { ROUTES } from "../constants/routes";
import { removeItemFromAsyncStorage } from "../helpers/asyncStorage";

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { user } = useSelector((state) => state.authState);

  const handleLogout = useCallback(() => {
    removeItemFromAsyncStorage(TOKEN_KEY);
    dispatch({ type: "RESET" });
    navigation.navigate(ROUTES.HOME);
  }, []);

  const navigateToTnCPage = useCallback(() => {
    navigation.navigate(ROUTES.TNC);
  }, []);

  return (
    <Profile
      navigateToTnCPage={navigateToTnCPage}
      user={user}
      handleLogout={handleLogout}
    />
  );
}
