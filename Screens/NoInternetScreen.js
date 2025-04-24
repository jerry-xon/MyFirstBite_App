import { SafeAreaView, View, StyleSheet, Dimensions } from "react-native";
import { Modal } from "react-native-paper";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BodyText } from "../components/common/Typography";
import { colors } from "../theme/colors";

const NoInternetScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={true}>
        <View style={styles.noInternetModal}>
          <AntDesign
            name="exclamationcircle"
            size={24}
            color={colors.primary}
          />
          <BodyText
            weight={"600"}
            color={colors.black}
            text="No internet connection."
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  noInternetModal: {
    borderWidth: 1,
    backgroundColor: colors.white,
    padding: 16,
    shadowOpacity: 0.4,
    elevation: 12,
    alignSelf: "center",
    rowGap: 12,
    width: Dimensions.get("window").width - 64,
    height: 200,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NoInternetScreen;
