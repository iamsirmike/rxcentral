import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

interface DatePickerProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: FieldError;
  placeholder?: string;
}

export default function DatePicker({
  name,
  control,
  label,
  error,
  placeholder = "Select date",
}: DatePickerProps) {
  const [show, setShow] = useState(false);

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={[styles.input, error && styles.inputError]}
              onPress={() => setShow(true)}
            >
              <Text style={[styles.inputText, !value && styles.placeholder]}>
                {value ? formatDate(new Date(value)) : placeholder}
              </Text>
              <Ionicons
                name="calendar-outline"
                size={20}
                color={Colors.text.secondary}
              />
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShow(Platform.OS === "ios");
                  if (selectedDate) {
                    onChange(selectedDate.toISOString());
                  }
                }}
                maximumDate={new Date()}
              />
            )}
          </>
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
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border.default,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.background.primary,
  },
  inputText: {
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.primary,
  },
  placeholder: {
    color: Colors.text.placeholder,
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
