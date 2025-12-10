import React from "react";
import {
  DimensionValue,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/colors";

interface ButtonProps {
  title: string;
  height?: DimensionValue;
  width?: DimensionValue;
  onPress: () => void;
  disabled?: boolean;
}

export default function OutlineButton({
  title,
  height,
  width,
  onPress,
  disabled,
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
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.background.primary,
    borderColor: "#ADADAD",
    borderWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: Colors.border.default,
  },
  buttonText: {
    color: "#7C7C7C",
    fontSize: 18,
    fontWeight: "bold",
  },
});
