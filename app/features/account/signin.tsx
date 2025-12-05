import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";
import PrimaryButton from "../../shared/components/forms/PrimaryButton";
import TextField from "../../shared/components/forms/TextField";
import { Colors } from "../../shared/constants/colors";
import { Fonts } from "../../shared/constants/fonts";

const { width, height } = Dimensions.get("window");

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function SignInScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  // Watch form values to determine if button should be disabled
  const email = watch("email");
  const password = watch("password");
  const isButtonDisabled = !email?.trim() || !password?.trim();

  const onSubmit = (data: LoginFormData) => {
    console.log(data);
    // Navigate to main app after successful login
    // router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require("../../../assets/images/logocolored.png")}
            style={styles.logo}
          />
          <Text style={styles.header}>Welcome</Text>
          <Text style={styles.subtitle}>
            Enter your valid credentials to continue to RxCentral
          </Text>

          <View style={styles.formContainer}>
            <TextField
              name="email"
              control={control}
              label="EMAIL OR QUID"
              placeholder="E.g me@gmail.com"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <TextField
              name="password"
              control={control}
              label="PASSWORD"
              placeholder="*********"
              error={errors.password}
              secureTextEntry={!showPassword}
              suffixIcon={
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#999"
                />
              }
              onSuffixPress={() => setShowPassword(!showPassword)}
            />
            <Text style={styles.forgotPassword}>Forgot password</Text>

            <PrimaryButton
              title="Sign In"
              // disabled={isButtonDisabled}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <Text style={styles.noaccountText}>Don’t have an account?</Text>
          <TouchableOpacity
            onPress={() => router.push("/features/account/signup")}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 10,
              }}
            >
              <Text style={styles.signup}>Sign Up</Text>
              <View style={{ width: 10 }}></View>
              <Ionicons name="arrow-forward" size={24} color={Colors.primary} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
    backgroundColor: Colors.background.primary,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  logo: {
    marginTop: 40,
  },
  header: {
    fontSize: 24,
    fontFamily: Fonts.lato.bold,
    color: Colors.text.primary,
    paddingTop: 30,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.secondary,
    paddingTop: 10,
  },
  formContainer: {
    paddingTop: 30,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontFamily: Fonts.lato.bold,
  },
  forgotPassword: {
    color: Colors.primary,
    fontFamily: Fonts.lato.bold,
    fontSize: 14,
  },
  noaccountText: {
    marginTop: 30,
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.secondary,
    textAlign: "right",
  },
  signup: {
    fontFamily: Fonts.lato.bold,
    fontSize: 16,
    color: Colors.primary,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 50,
  },
});
