import LoginScreen from "@/Components/LoginScreen";
import SignupScreen from "@/Components/SignUpScreen";
import { useColors } from "@/config/useColors";
import { useAuthContext } from "@/context/useAuth";
import { Redirect } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

export default function Index() {
  const { lightModeColor } = useColors();
  const { isLoggedIn } = useAuthContext();
  const [loginSignupScreenStatus, setLoginSignupScreenStatus] = useState<
    "login" | "signup"
  >("login");

  const isSignUp = loginSignupScreenStatus === "signup";
  const isLogin = loginSignupScreenStatus === "login";

  const switchToSignUp = () => setLoginSignupScreenStatus("signup");
  const switchToLogin = () => setLoginSignupScreenStatus("login");

  if (isLoggedIn) return <Redirect href={"/(Protected)/Home"} />;

  return (
    <View style={[styles.container, { backgroundColor: lightModeColor }]}>
      {isLogin ? <LoginScreen switchToSignup={switchToSignUp} /> : null}
      {isSignUp ? <SignupScreen switchToLogin={switchToLogin} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
  },
});
