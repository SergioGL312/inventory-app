// AsyncStorage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();
    console.log('AsyncStorage cleared successfully');
  } catch (error) {
    console.error('Error clearing AsyncStorage:', error);
  }
};

export const saveData = async (key, data) => {
  try {
    const jsonData = JSON.stringify(data);
    await AsyncStorage.setItem(key, jsonData);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const getData = async (key) => {
  try {
    const jsonData = await AsyncStorage.getItem(key);
    return jsonData !== null ? JSON.parse(jsonData) : null;
  } catch (error) {
    console.error('Error getting data:', error);
    return null;
  }
};
