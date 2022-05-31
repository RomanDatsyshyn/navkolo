import AsyncStorage from '@react-native-async-storage/async-storage';

export const setLenghtOfFeed = async value => {
  try {
    await AsyncStorage.setItem('@lenghtOfFeed', value);
  } catch (e) {
    console.log(e);
  }
};

export const getLenghtOfFeed = async () => {
  try {
    const value = await AsyncStorage.getItem('@lenghtOfFeed');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const clearLenghtOfFeed = async () => {
  try {
    await AsyncStorage.removeItem('@lenghtOfFeed');
  } catch (e) {
    console.log(e);
  }
};
