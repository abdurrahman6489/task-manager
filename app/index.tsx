import LoginScreen from "@/Components/LoginScreen";
import { useColors } from "@/config/useColors";
import { useAuthContext } from "@/context/useAuth";
import { Redirect } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function Index() {
  const { lightModeColor } = useColors();
  const { isLoggedIn } = useAuthContext();
  if (isLoggedIn) return <Redirect href={"/(Protected)/Home"} />;
  return (
    <View style={[styles.container, { backgroundColor: lightModeColor }]}>
      <LoginScreen />
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
