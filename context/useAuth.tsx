import { removeAuthToken, retrieveAuthToken } from "@/Utils/AuthToken";
import { getAuthStateFromToken } from "@/Utils/getAuthStateFromToken";
import { router, SplashScreen } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";

export type User = {
  _id: string;
  name: string;
  email: string;
  token: string;
};

type AuthContextType = {
  state: User | null;
  isLoggedIn: boolean;
  authChecking: boolean;
  changeLogin: (status: boolean) => void;
  changeAuthState: (authState: User | null) => void;
  checkAuth: () => void;
  logout: () => void;
};

const initialAuthContextState: AuthContextType = {
  changeAuthState: (authState: User | null) => {},
  changeLogin: (status: boolean) => {},
  authChecking: true,
  isLoggedIn: false,
  state: null,
  checkAuth: () => {},
  logout: () => {},
};

const AuthContext = createContext<AuthContextType>(initialAuthContextState);

export const useAuthContext = () => useContext(AuthContext);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
  const changeAuthState = (authState: User | null) => setState(authState);
  const changeLogin = (status: boolean) => setIsLoggedIn(status);

  const checkAuth = async () => {
    try {
      setAuthChecking(true);
      const authToken = await retrieveAuthToken();
      if (!authToken) {
        changeLogin(false);
        changeAuthState(null);
        return;
      }
      const authState = getAuthStateFromToken(authToken);
      changeLogin(true);
      changeAuthState(authState);
    } catch (error) {
      console.error("check auth error", error);
      changeLogin(false);
      changeAuthState(null);
    } finally {
      setAuthChecking(false);
      SplashScreen.hideAsync();
    }
  };

  const logout = () => {
    changeAuthState(null);
    changeLogin(false);
    removeAuthToken();
    router.replace("/");
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        isLoggedIn,
        authChecking,
        changeAuthState,
        changeLogin,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
