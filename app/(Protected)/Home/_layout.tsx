import { useColors } from "@/config/useColors";
import { Stack } from "expo-router";

const Layout = () => {
  const { lightModeColor } = useColors();
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
        contentStyle: { backgroundColor: lightModeColor },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
    </Stack>
  );
};
export default Layout;
