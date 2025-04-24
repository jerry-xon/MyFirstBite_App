import {
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LargeText, NavigationText } from "../components/common/Typography";

const PopularLocations = () => {
  const locations = ["Ahmedabad", "Bangalore", "Chennai", "Delhi", "Kolkata"];

  return (
    <>
      <View style={styles.Citycontainer}>
        <View style={styles.title}>
          <NavigationText
            text={`Popular Locations`}
            weight="700"
            color="#3E4756"
          />
        </View>
        <ScrollView>
          <View style={styles.CityNamecontainer}>
            {locations.map((location, index) => (
              <NavigationText
                text={location}
                weight="500"
                color="#3E4756"
                key={location}
                style={styles.location}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.NextButtonContainer}>
        <TouchableOpacity style={styles.fab}>
          <FontAwesome5 name="angle-right" size={36} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </>
  );
};
export default function Chooseyourcity() {
  return (
    <SafeAreaView style={styles.screenBG}>
      {/* <View style={styles.BGimage}>
        <Image source={require("../assets/discoount.svg")} />
      </View> */}
      <View style={styles.chooseCityArea}>
        <View style={styles.line} />
        <View style={styles.choosecityheading}>
          <LargeText
            text={`Choose your city`}
            weight={"600"}
            color={"#000000"}
          />
        </View>
        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="Where do you live ?"
            placeholderTextColor="#959595"
            style={styles.input}
          />
        </View>
        <View style={styles.IconUseLocationContainer}>
          <FontAwesome5 name="location-arrow" size={24} color="#E4122F" />
          <View style={styles.uselocationText}>
            <NavigationText
              text={`Use my current location`}
              color="#3E4756"
              weight="500"
            />
          </View>
        </View>
        <Divider />
        <PopularLocations />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  BGimage: {
    opacity: 0.1,
  },
  chooseCityArea: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    width: "100%",
    bottom: 0,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  screenBG: {
    flex: 1,
  },
  line: {
    height: 4,
    width: 80,
    borderRadius: 12,
    top: 12,
    alignSelf: "center",
    backgroundColor: "#BABABA",
  },
  choosecityheading: {
    alignItems: "center",
    paddingVertical: 16,
    paddingTop: 28,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 12,
    fontWeight: "500",
    fontSize: 16,
    borderColor: "#E4122F",
  },
  inputcontainer: {
    paddingHorizontal: 16,
  },
  IconUseLocationContainer: {
    paddingVertical: 16,
    paddingTop: 24,
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  uselocationText: {
    paddingHorizontal: 12,
  },

  Citycontainer: {
    paddingHorizontal: 12,
    rowGap: 28,
  },
  title: {
    paddingTop: 20,
  },
  location: {
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#E4122F",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    bottom: 16,
    right: 16,
  },
  NextButtonContainer: {
    marginLeft: "auto",
    padding: 16,
  },
  CityNamecontainer: {
    rowGap: 32,
  },
});
