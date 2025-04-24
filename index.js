import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyProfile from "./Screens/MyProfile";
import AddAddressScreen from "./Screens/AddAddressScreen";
import Chooseyourcity from "./Screens/Chooseyourcity";
import LoginScreen from "./Screens/LoginScreen";
import { ROUTES } from "./constants/routes";
import OtpScreen from "./Screens/OtpScreen";
import RestroMenuScreen from "./Screens/RestroMenuScreen";
import { initializeAuth } from "./redux/reducers/auth/authReducer";
import HomeScreen from "./Screens/HomeScreen";
import FullPageLoader from "./components/common/FullPageLoader";
import CartScreen from "./Screens/CartScreen";
import Success from "./Screens/Success";
import MyOrdersScreen from "./Screens/MyOrdersScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import AddresseScreen from "./Screens/AddresseScreen";
import TnC from "./Screens/TnC";
import ChooseCity from "./Screens/ChooseCity"

export default function Main() {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.authState);

  useEffect(() => {
    dispatch(initializeAuth());
  }, []);

  if (authState.isUserAuthenticated == null) {
    return <FullPageLoader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={
          authState.isUserAuthenticated === true ? ROUTES.HOME : ROUTES.LOGIN
        }
      >
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.LOGIN}
          component={LoginScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.HOME}
          component={HomeScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.CART}
          component={CartScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.PROFILE}
          component={ProfileScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.MY_ORDERS}
          component={MyOrdersScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.RESTRO_MENU}
          component={RestroMenuScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.MY_PROFILE}
          component={MyProfile}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.ADD_ADDRESS}
          component={AddAddressScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.SELECT_ADDRESS}
          component={AddresseScreen}
        />

        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.REVIEW}
          component={Review}
        /> */}

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.CHOOSE_CITY}
          component={ChooseCity}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.OTP}
          component={OtpScreen}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.SUCCESS}
          component={Success}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={ROUTES.TNC}
          component={TnC}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
