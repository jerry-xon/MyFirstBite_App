import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { getStoredCity } from "../helpers/CityStorage";
import ChooseCity from "./ChooseCity";
import { clearStoredCity } from "../helpers/CityStorage";

const ChooseCityWrapper = ({ children }) => {
  const [isCitySet, setIsCitySet] = useState(false);
  const [checking, setChecking] = useState(true);


  useEffect(() => {
    const checkCity = async () => {
      // Temporarily clear the selected city for testing
      await clearStoredCity(); // This will reset the city selection
      const city = await getStoredCity();
      console.log("✅ Stored City:", city);

      if (city) {
        setIsCitySet(true);
      }
      setChecking(false);
    };

    checkCity();
  }, []);

  useEffect(() => {
    const checkCity = async () => {
      const city = await getStoredCity();
      if (city) {
        setIsCitySet(true);
      }
      setChecking(false);
    };
    checkCity();
  }, []);

  const handleCitySelect = (city) => {
    setIsCitySet(true);
  };

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {!isCitySet && <ChooseCity visible={!isCitySet} onSelect={handleCitySelect} />}
      {isCitySet && children}
    </>
  );
};

export default ChooseCityWrapper;
