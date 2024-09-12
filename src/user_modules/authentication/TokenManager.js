import AsyncStorage from "@react-native-async-storage/async-storage";  

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

class TokenManager {
  static async SaveUserAsync(user) {
    try {      
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));   
    }    catch (error) {
      console.log(error);
    }
  }

  static async SaveTokenAsync(token) {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, JSON.stringify(token));
    } catch (error) {
      console.log(error);
    }
  }

  static async ClearStorageAsync() {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(USER_KEY);
  }

  static async getTokenAsync() {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      return token? JSON.parse(token) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async getUserAsync() {
    try {
      const user = await AsyncStorage.getItem(USER_KEY);
      return user? JSON.parse(user) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

}   

export default TokenManager;