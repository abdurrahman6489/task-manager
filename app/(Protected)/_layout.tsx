import Header from "@/Components/Header";
import { useAuthContext } from "@/context/useAuth";
import { Stack } from "expo-router";
import React from "react";

export default function ProtectedLayout() {
  const { logout } = useAuthContext();
  return (
    <Stack screenOptions={{ header: () => <Header onLogout={logout} /> }}>
      <Stack.Screen
        name="Home"
        options={{
          title: "Home",
        }}
      />
      <Stack.Screen
        name="CreateTask"
        options={{
          title: "Create Task",
        }}
      />
    </Stack>
  );
}
