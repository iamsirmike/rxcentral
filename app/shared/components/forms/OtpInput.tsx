import React, { useRef, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

interface OtpInputProps {
  length?: number;
  onComplete?: (otp: string) => void;
  onChangeOtp?: (otp: string) => void;
  error?: string;
}

export default function OtpInput({
  length = 4,
  onComplete,
  onChangeOtp,
  error,
}: OtpInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const refs = useRef<(TextInput | null)[]>([]);

  const handleChangeText = (text: string, index: number) => {
    // Handle paste of multiple digits
    if (text.length > 1) {
      handlePaste(text);
      return;
    }

    // Only allow single digit
    const digit = text.slice(-1);

    if (!/^\d*$/.test(digit)) return; // Only numbers

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    const otpString = newOtp.join("");
    onChangeOtp?.(otpString);

    // Auto focus next field
    if (digit && index < length - 1) {
      refs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (otpString.length === length && !otpString.includes("")) {
      onComplete?.(otpString);
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === "Backspace") {
      if (!otp[index] && index > 0) {
        // Focus previous field if current is empty
        refs.current[index - 1]?.focus();
      } else {
        // Clear current field
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        onChangeOtp?.(newOtp.join(""));
      }
    }
  };

  const handlePaste = (text: string) => {
    // Handle paste functionality
    const digits = text.replace(/\D/g, "").slice(0, length);
    const newOtp = new Array(length).fill("");

    for (let i = 0; i < digits.length; i++) {
      newOtp[i] = digits[i];
    }

    setOtp(newOtp);
    onChangeOtp?.(newOtp.join(""));

    // Focus last filled field or next empty field
    const focusIndex = Math.min(digits.length, length - 1);
    refs.current[focusIndex]?.focus();

    if (digits.length === length) {
      onComplete?.(digits);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              refs.current[index] = ref;
            }}
            style={[
              styles.otpInput,
              digit ? styles.filledInput : {},
              error ? styles.errorInput : {},
            ]}
            value={digit}
            onChangeText={(text) => handleChangeText(text, index)}
            onKeyPress={({ nativeEvent }) =>
              handleKeyPress(nativeEvent.key, index)
            }
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            autoFocus={index === 0}
            selectTextOnFocus
          />
        ))}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  otpContainer: {
    flexDirection: "row",
    gap: 12,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1.4,
    borderColor: Colors.border.default,
    borderRadius: 8,
    fontSize: 24,
    fontFamily: Fonts.lato.bold,
    color: Colors.text.primary,
    backgroundColor: Colors.background.primary,
    marginHorizontal: 4,
  },
  filledInput: {
    borderColor: Colors.primary,
  },
  errorInput: {
    borderColor: Colors.error,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.lato.regular,
    color: Colors.error,
    marginTop: 8,
    textAlign: "center",
  },
});
