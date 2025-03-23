import AsyncStorage from "@react-native-async-storage/async-storage";

const authTokenKey = "auth-token";
export const retrieveAuthToken = async () => {
  try {
    const authToken = await AsyncStorage.getItem(authTokenKey);
    return authToken ? authToken : null;
  } catch (error) {
    console.error("retrieve Auth token error", error);
    return null;
  }
};

export const saveAuthToken = async (token: string) => {
  try {
    await AsyncStorage.setItem(authTokenKey, token);
  } catch (error) {
    console.error("save auth token error", error);
  }
};
