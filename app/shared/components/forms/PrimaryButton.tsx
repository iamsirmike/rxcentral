import React from "react";
import {
  ActivityIndicator,
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../constants/colors";

interface ButtonProps {
  title: string;
  isLoading: boolean;
  disabled?: boolean;
  width?: DimensionValue;
  height?: DimensionValue;
  onPress: () => void;
}

export default function PrimaryButton({
  title,
  isLoading,
  disabled,
  width,
  height,
  onPress,
}: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        width != null ? { width: width as DimensionValue } : undefined,
        height != null ? { height: height as DimensionValue } : undefined,
      ]}
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator color={Colors.background.white} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1D74B9",
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    flex: 1,
  },
  buttonWidth: {
    width: "50%",
  },
  buttonHeight: {
    height: 50,
  },
  buttonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
