import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

interface TextFieldProps extends TextInputProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: FieldError;
  suffixIcon?: React.ReactNode;
  onSuffixPress?: () => void;
  style?: any;
}

export default function TextField({
  name,
  control,
  label,
  error,
  suffixIcon,
  onSuffixPress,
  style,
  ...textInputProps
}: TextFieldProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                error && styles.inputError,
                suffixIcon && styles.inputWithSuffix,
                style,
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholderTextColor="#999"
              {...textInputProps}
            />
          )}
        />
        {suffixIcon && (
          <TouchableOpacity style={styles.suffixIcon} onPress={onSuffixPress}>
            {suffixIcon}
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.secondary,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  inputContainer: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border.default,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    backgroundColor: Colors.background.primary,
  },
  inputError: {
    borderColor: Colors.border.error,
  },
  inputWithSuffix: {
    paddingRight: 40,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.error,
    marginTop: 4,
  },
  suffixIcon: {
    position: "absolute",
    right: 16,
    top: 45,
  },
});
