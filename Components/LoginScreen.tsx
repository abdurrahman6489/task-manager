import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { loginSchema, loginType } from "@/Types/signupLogin";
import { useColors } from "@/config/useColors";
import AppTextInput from "./AppTextInput";
import { login } from "@/services/login";
import { toast } from "sonner-native";
import { toastAutoHideDuration } from "@/constants";
import { useAuthContext } from "@/context/useAuth";
import { getAuthStateFromToken } from "@/Utils/getAuthStateFromToken";
import AppButton from "./AppButton";
import { TextInput } from "react-native-paper";
import { router } from "expo-router";
import { saveAuthToken } from "@/Utils/AuthToken";
const logo = require("../assets/images/logo.jpg");
const LoginScreen = () => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const { changeAuthState, changeLogin } = useAuthContext();
  const { darkModeColor, dangerColor, lightModeColor } = useColors();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginUser = async (user: loginType) => {
    try {
      setLoading(true);
      const { data } = await login(user);
      if (!data.success) {
        toast.error(data.error || "Unable to login, Please try later", {
          duration: toastAutoHideDuration,
        });
        changeLogin(false);
        changeAuthState(null);
        return;
      }
      const token = data.token;
      const authState = getAuthStateFromToken(token);
      changeAuthState(authState);
      changeLogin(true);
      saveAuthToken(token);
      router.push("/(Protected)/Home");
      toast.success(data.message || "logged in successfully", {
        duration: toastAutoHideDuration,
      });
    } catch (error: any) {
      console.error("login error", error);
      const msg = error?.response?.data?.error;
      toast.error(msg || "Unable to login, Please try later", {
        duration: toastAutoHideDuration,
      });
      changeLogin(false);
      changeAuthState(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: lightModeColor },
      ]}
      keyboardShouldPersistTaps="handled"
    >
      <View style={{ flexGrow: 1 }}></View>
      <View
        style={{
          width: "60%",
          overflow: "hidden",
          aspectRatio: 1,
          marginTop: 20,
          marginBottom: 20,
          borderRadius: 10,
          marginHorizontal: "auto",
        }}
      >
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={[styles.appNameStyle, { color: darkModeColor }]}>
        Task Manager
      </Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            placeholder="Enter Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{ backgroundColor: lightModeColor }}
            textColor={darkModeColor}
            label={"Email"}
            keyboardType="default"
          />
        )}
        name="email"
      />
      <View style={{ minHeight: 10, marginBottom: 5 }}>
        {errors.email && (
          <Text style={{ color: dangerColor }}>{errors.email?.message}</Text>
        )}
      </View>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            placeholder="Enter Password"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{ backgroundColor: lightModeColor }}
            textColor={darkModeColor}
            label={"Password"}
            keyboardType="default"
            secureTextEntry={isSecureEntry}
            right={
              <TextInput.Icon
                icon={isSecureEntry ? "eye-off" : "eye"}
                onPress={() => setIsSecureEntry((prev) => !prev)}
              />
            }
          />
        )}
        name="password"
      />
      <View style={{ minHeight: 10, marginBottom: 5 }}>
        {errors.password && (
          <Text style={{ color: dangerColor }}>{errors.password?.message}</Text>
        )}
      </View>
      <View style={{ flexGrow: 1 }}></View>
      <AppButton
        onPress={handleSubmit(loginUser)}
        loading={loading}
        disabled={loading}
        style={{
          marginTop: "auto",
          justifyContent: "center",
          marginHorizontal: "auto",
        }}
      >
        {loading ? "Logging in" : "Login"}
      </AppButton>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginVertical: "auto",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  appNameStyle: { fontSize: 25, fontWeight: "bold", textAlign: "center" },
  appSubNameStyle: { fontSize: 22, fontWeight: "500", textAlign: "center" },
});
