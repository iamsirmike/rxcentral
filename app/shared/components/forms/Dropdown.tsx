import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

interface DropdownProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  items: Array<{ label: string; value: string }>;
}

export default function Dropdown({
  name,
  control,
  label,
  error,
  placeholder = "Select option",
  items,
}: DropdownProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View style={[styles.pickerContainer, error && styles.inputError]}>
            <RNPickerSelect
              onValueChange={onChange}
              value={value}
              placeholder={{ label: placeholder, value: null }}
              items={items}
              style={pickerStyles}
            />
          </View>
        )}
      />
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: Colors.border.default,
    borderRadius: 12,
    backgroundColor: Colors.background.primary,
    fontFamily: Fonts.lato.regular,
    fontSize: 16,
  },
  inputError: {
    borderColor: Colors.border.error,
  },
  errorText: {
    fontSize: 14,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.error,
    marginTop: 4,
  },
});

const pickerStyles = {
  inputIOS: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.primary,
  },
  inputAndroid: {
    paddingHorizontal: 20,
    paddingVertical: 0,
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.primary,
  },
  placeholder: {
    color: Colors.text.placeholder,
  },
};
