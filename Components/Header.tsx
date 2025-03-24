import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { memo } from "react";
import AppIconButton from "./AppIconButton";
import { useColors } from "../config/useColors";
import { ParamListBase } from "@react-navigation/native";
import { router } from "expo-router";

const LOGO = require("../assets/images/logo.jpg");

type HeaderProps = {
  onLogout: () => void;
};

const Header = memo(({ onLogout }: HeaderProps) => {
  const { lightModeColor } = useColors();

  const backgroundColor = lightModeColor;

  return (
    <View style={[styles.header, { backgroundColor }]}>
      {/* Logo */}
      <TouchableOpacity onPress={() => router.push("/(Protected)/Home")}>
        <Image
          source={LOGO}
          style={styles.logo}
          resizeMode="contain"
          alt={"logo"}
        />
      </TouchableOpacity>
      {/* Menu */}
      <View style={styles.menu}>
        <AppIconButton icon={"logout"} onPress={onLogout} size={40} />
      </View>
    </View>
  );
});

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  menu: {
    flexDirection: "row",
  },
  menuItem: {
    marginLeft: 15,
    padding: 5,
  },
  logo: { height: 70, width: 70, borderRadius: 10 },
});
