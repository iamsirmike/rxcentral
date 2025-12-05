import OutlineButton from "@/app/shared/components/forms/OutlineButton";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OtpInput from "../../shared/components/forms/OtpInput";
import { Colors } from "../../shared/constants/colors";
import { Fonts } from "../../shared/constants/fonts";

export default function OtpScreen() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isResending, setIsResending] = useState(false);

  const handleOtpComplete = (otpValue: string) => {
    setOtp(otpValue);
    setError(""); // Clear any existing errors
  };

  const handleOtpChange = (otpValue: string) => {
    setOtp(otpValue);
    if (error) setError(""); // Clear error when user types
  };

  const handleVerify = () => {
    if (otp.length !== 4) {
      setError("Please enter the complete 4-digit code");
      return;
    }

    // Simulate OTP verification
    if (otp === "1234") {
      // Mock verification
      router.replace("/features/account/verificationsucess");
    } else {
      setError("Invalid verification code. Please try again.");
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      // You could show a success message here
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../../assets/images/otpicon.png")}
          style={styles.logo}
        />

        <Text style={styles.header}>Account Verification</Text>
        <Text style={styles.subtitle}>
          Enter the four digit pin we sent to your email to verify your account.
        </Text>

        <View style={styles.otpContainer}>
          <OtpInput
            onComplete={handleOtpComplete}
            onChangeOtp={handleOtpChange}
            error={error}
          />
        </View>

        <OutlineButton
          title="Verify Account"
          disabled={otp.length !== 4}
          onPress={handleVerify}
        />

        <View style={styles.resendContainer}>
          <Text style={styles.resendText}>Didn't receive the code? </Text>
          <TouchableOpacity onPress={handleResendCode} disabled={isResending}>
            <Text style={styles.resendLink}>
              {isResending ? "Sending..." : "Resend code"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  logo: {
    marginTop: 100,
    marginBottom: 40,
    height: 100,
    width: 100,
    alignSelf: "center",
  },
  header: {
    fontSize: 24,
    fontFamily: Fonts.lato.bold,
    color: Colors.text.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    fontWeight: "400",
    color: Colors.text.secondary,
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  otpContainer: {
    marginBottom: 40,
  },
  resendContainer: {
    flexDirection: "column",
    justifyContent: "flex-end",
    marginTop: 20,
  },
  resendText: {
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.secondary,
    textAlign: "right",
  },
  resendLink: {
    fontSize: 16,
    fontFamily: Fonts.lato.bold,
    color: Colors.primary,
    textAlign: "right",
    paddingTop: 8,
  },
});
