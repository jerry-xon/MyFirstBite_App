import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeItemInAsyncStorage = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, data);
  } catch (error) {
    console.error("Error storing the token", error);
  }
};

export const getItemFromAsyncStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.error("Error retrieving the token", error);
  }
  return null;
};

export const removeItemFromAsyncStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing the token", error);
  }
};


export const getStoredCity = async () => {
  return await AsyncStorage.getItem('selectedCity');
};

export const setStoredCity = async (city) => {
  await AsyncStorage.setItem('selectedCity', city);
};
