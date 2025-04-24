import { useCallback, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { ActivityIndicator, Platform } from "react-native";
import { PaperProvider } from "react-native-paper";
import * as Font from "expo-font";
import * as Updates from "expo-updates";
import { useNetInfoInstance } from "@react-native-community/netinfo";
import Main from "./index";
import { theme } from "./theme";
import { store } from "./redux/store";
import ControlledComponent from "./components/common/ControlledComponent";
import NoInternetScreen from "./Screens/NoInternetScreen";
import FullPageLoader from "./components/common/FullPageLoader";
import ChooseCityWrapper from "./Screens/ChooseCityWrapper";

const fetchFonts = () =>
  Font.loadAsync({
    "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter-SemiBold.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
    "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
  });

export default function App() {
  const net = useNetInfoInstance();
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const onFetchUpdateAsync = useCallback(async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (err) {
      console.log(`Error fetching latest Expo update: ${err}`);
    }
  }, []);

  const loadFonts = useCallback(async () => {
    try {
      await fetchFonts();
      setFontsLoaded(true);
    } catch (err) {
      console.log("MFB-error-logs ~ loadFonts ~ err:", err);
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (Platform.OS === "ios") {
      loadFonts();
    }
  }, []);

  useEffect(() => {
    onFetchUpdateAsync();
  }, [onFetchUpdateAsync]);

  if (!fontsLoaded && Platform.OS === "ios") {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <ControlledComponent
          controller={net.netInfo.isInternetReachable == null}
        >
          <FullPageLoader />
        </ControlledComponent>
        <ControlledComponent
          controller={net.netInfo.isInternetReachable === true}
        >
          <Main />
        </ControlledComponent>
        <ControlledComponent
          controller={net.netInfo.isInternetReachable === false}
        >
          <NoInternetScreen />
        </ControlledComponent>
      </PaperProvider>
    </Provider>
  );
}
