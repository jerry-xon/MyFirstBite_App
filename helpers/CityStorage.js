import {
    storeItemInAsyncStorage,
    getItemFromAsyncStorage,
    removeItemFromAsyncStorage,
  } from "./asyncStorage";
  import { STORAGE_KEYS } from "../constants/CityKey";
  
  export const getStoredCity = async () =>
    await getItemFromAsyncStorage(STORAGE_KEYS.CITY);
  
  export const setStoredCity = async (city) =>
    await storeItemInAsyncStorage(STORAGE_KEYS.CITY, city);
  
  // export const clearStoredCity = async () =>
  //   await removeItemFromAsyncStorage(STORAGE_KEYS.CITY);

  export const clearStoredCity = async () => {
    try {
      console.log('Removing city from AsyncStorage');
      await removeItemFromAsyncStorage(STORAGE_KEYS.CITY);
    } catch (error) {
      console.error('Error clearing selected city: ', error);
    }
  };
  
  