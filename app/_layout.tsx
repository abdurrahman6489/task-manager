import { SplashScreen, Stack } from "expo-router";
import { useColorScheme, View } from "react-native";
import {
  MD3DarkTheme,
  PaperProvider,
  DefaultTheme,
  ActivityIndicator,
} from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import AuthContextProvider, { useAuthContext } from "@/context/useAuth";
import { useColors } from "@/config/useColors";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/Components/Header";

SplashScreen.preventAutoHideAsync();
export function RootLayout() {
  const isDark = useColorScheme() === "dark";
  const { lightModeColor } = useColors();
  const { authChecking, checkAuth, logout } = useAuthContext();

  useEffect(() => {
    checkAuth();
  }, []);
  if (authChecking) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: lightModeColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        statusBarStyle: isDark ? "light" : "dark",
        header: () => <Header onLogout={logout} />,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "index",
        }}
      />
      <Stack.Screen
        name="/(Protected)/Home"
        options={{
          title: "Home",
        }}
      />
    </Stack>
  );
}

export default function RootLayoutWrapper() {
  const isDark = useColorScheme() === "dark";
  const { lightModeColor } = useColors();
  return (
    <AuthContextProvider>
      <GestureHandlerRootView>
        <SafeAreaView style={{ flex: 1, backgroundColor: lightModeColor }}>
          <PaperProvider theme={isDark ? MD3DarkTheme : DefaultTheme}>
            <StatusBar style={isDark ? "light" : "dark"} />
            <RootLayout />
          </PaperProvider>
        </SafeAreaView>
        <Toaster position="bottom-center" />
      </GestureHandlerRootView>
    </AuthContextProvider>
  );
}
