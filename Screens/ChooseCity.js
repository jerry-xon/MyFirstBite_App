import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import backgroundImage from "../assets/login-background.png";
import scooterImage from "../assets/scooter.png";
import { LargeText } from "../components/common/Typography";
import { setStoredCity } from "../helpers/CityStorage";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../constants/routes";


const { width } = Dimensions.get("window");

const ChooseCity = () => {
  const navigation = useNavigation();
  
  const handleSelectCity = async (city) => {
    console.log("Selected city:", city);
    await setStoredCity(city);
    navigation.replace(ROUTES.HOME);
 
  };
 
  

  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay} />

      <View style={styles.modalContainer}>
        <LargeText text={`Choose your city`} weight={"600"} />
        <View style={styles.imageContainer}>
          <Image
            source={scooterImage}
            style={styles.image}
            resizeMode="contain"
          />
        </View>
        <View style={styles.citybuttonContainer}>
          <TouchableOpacity
            style={styles.cityButton}
            onPress={() => handleSelectCity("Nimbahera")}
          >
            <Text style={styles.cityText}>Mumbai</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cityButton}
            onPress={() => handleSelectCity("Chhoti Sadri")}
          >
            <Text style={styles.cityText}>Udaipur</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default ChooseCity;

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.59)",
  },
  modalContainer: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
    width: width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 10,
  },

  image: {
    width: 150,
    height: 120,
  },
  cityButton: {
    paddingVertical: 12,
    borderRadius: 12,
    borderColor: "#9F9F9F",
    borderWidth: 1,
    alignItems: "center",
  },
  cityText: {
    fontSize: 16,
  },
  citybuttonContainer: {
    rowGap: 12,
    width: "100%",
  },
  imageContainer: { paddingVertical: 16 },
});
