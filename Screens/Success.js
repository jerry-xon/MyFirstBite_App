import { View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BodyText, SuccessText } from "../components/common/Typography";
import { ROUTES } from "../constants/routes";

export default function Success() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.ScreenBG}>
      <View style={styles.container}>
        <View>
          <AntDesign name="checkcircle" size={120} color="white" />
        </View>
        <View style={styles.text}>
          <SuccessText
            text={`Congratulations`}
            color={"#FFFFFF"}
            weight={"800"}
          />
          <BodyText
            text={`Your Order has been placed.`}
            color={"#FFFFFF"}
            weight={"500"}
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate(ROUTES.HOME)}
          style={styles.homeButton}
        >
          <SuccessText text={`Home`} color={"#FFFFFF"} weight={"600"} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ScreenBG: {
    flex: 1,
    backgroundColor: "#E4122F",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    rowGap: 32,
  },
  text: {
    rowGap: 20,
    alignItems: "center",
  },
  homeButton: {
    paddingHorizontal: 56,
    paddingVertical: 8,
    borderColor: "white",
    borderRadius: 28,
    borderWidth: 3,
  },
});
