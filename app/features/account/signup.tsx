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

const signupSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  branch: z.string().min(1, "Branch is required"),
  pharmacyName: z.string().min(1, "Pharmacy Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
});

type SignUpFormData = z.infer<typeof signupSchema>;

export default function SignUpScreen() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      branch: "",
      pharmacyName: "",
      phone: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  // Watch form values to determine if button should be disabled
  const email = watch("email");
  const password = watch("password");
  const branch = watch("branch");
  const pharmacyName = watch("pharmacyName");
  const phone = watch("phone");
  const isButtonDisabled =
    !email?.trim() ||
    !password?.trim() ||
    !branch?.trim() ||
    !pharmacyName?.trim() ||
    !phone?.trim();

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
    // Navigate to main app after successful login
    router.replace("/(tabs)");
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
          <Text style={styles.header}>Create your account</Text>
          <Text style={styles.subtitle}>
            Providing these details will allow you access Qyeron services.
          </Text>

          <View style={styles.formContainer}>
            <TextField
              name="pharmacyName"
              control={control}
              label="PHARMACY NAME"
              placeholder="E.g Mikeys Pharmacy"
              error={errors.pharmacyName}
              autoCapitalize="none"
              keyboardType="default"
            />

            <TextField
              name="branch"
              control={control}
              label="BRANCH LOCATION"
              placeholder="E.g East Legon"
              error={errors.branch}
              autoCapitalize="none"
              keyboardType="default"
            />

            <TextField
              name="email"
              control={control}
              label="EMAIL"
              placeholder="E.g me@gmail.com"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <TextField
              name="phone"
              control={control}
              label="PHONE NUMBER"
              placeholder="E.g 0551806886"
              error={errors.phone}
              keyboardType="phone-pad"
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
            <PrimaryButton
              title="Sign Up"
              disabled={isButtonDisabled}
              onPress={handleSubmit(onSubmit)}
            />
          </View>

          <Text style={styles.noaccountText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => router.dismiss()}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",

                marginTop: 10,
              }}
            >
              <Text style={styles.signup}>Sign In</Text>
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
    marginTop: 20,
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
    paddingBottom: 20,
  },
});
