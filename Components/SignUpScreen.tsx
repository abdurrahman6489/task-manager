import { StyleSheet, Text, View, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  loginSchema,
  loginType,
  signupSchema,
  signupType,
} from "@/Types/signupLogin";
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
import { signup } from "@/services/signup";
const logo = require("../assets/images/logo.jpg");

type SignupScreenProps = {
  switchToLogin: () => void;
};

const SignupScreen = ({ switchToLogin }: SignupScreenProps) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const { changeAuthState, changeLogin } = useAuthContext();
  const { darkModeColor, dangerColor, lightModeColor } = useColors();
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<signupType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const signupUser = async (user: signupType) => {
    try {
      setLoading(true);
      const { data } = await signup(user);
      if (!data.success) {
        toast.error(data.error || "Unable to sign up, Please try later", {
          duration: toastAutoHideDuration,
        });
        return;
      }

      switchToLogin();
      toast.success(
        data.message || "Signed up successfully, Please login now",
        {
          duration: toastAutoHideDuration,
        }
      );
    } catch (error: any) {
      console.error("login error", JSON.stringify(error, null, 2));
      const msg = error?.response?.data?.error;
      toast.error(msg || "Unable to sign up, Please try later", {
        duration: toastAutoHideDuration,
      });
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
      <View style={styles.imageContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
      <Text style={[styles.appNameStyle, { color: darkModeColor }]}>
        Task Manager
      </Text>

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <AppTextInput
            placeholder="Enter Your Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={{ backgroundColor: lightModeColor }}
            textColor={darkModeColor}
            label={"Name"}
            keyboardType="default"
          />
        )}
        name="name"
      />
      <View style={{ minHeight: 10, marginBottom: 5 }}>
        {errors.name && (
          <Text style={{ color: dangerColor }}>{errors.name?.message}</Text>
        )}
      </View>
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
      <View style={styles.btnContainer}>
        <AppButton
          onPress={handleSubmit(signupUser)}
          loading={loading}
          disabled={loading}
          style={{
            marginVertical: 10,
          }}
        >
          {loading ? "Please wait..." : "Sign up"}
        </AppButton>
        <AppButton
          onPress={switchToLogin}
          disabled={loading}
          mode="text"
          style={{
            marginVertical: 10,
          }}
        >
          Already Registered? Login here
        </AppButton>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: "auto",
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "60%",
    overflow: "hidden",
    aspectRatio: 1,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 10,
    marginHorizontal: "auto",
  },
  appNameStyle: { fontSize: 25, fontWeight: "bold", textAlign: "center" },
  appSubNameStyle: { fontSize: 22, fontWeight: "500", textAlign: "center" },
  btnContainer: {
    marginTop: "auto",
    justifyContent: "center",
    marginHorizontal: "auto",
  },
});
