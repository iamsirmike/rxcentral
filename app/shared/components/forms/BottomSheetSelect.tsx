import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { Fonts } from "../../constants/fonts";

interface BottomSheetSelectProps {
  name: string;
  control: Control<any>;
  label?: string;
  error?: FieldError;
  placeholder?: string;
  items: Array<{ label: string; value: string }>;
}

export default function BottomSheetSelect({
  name,
  control,
  label,
  error,
  placeholder = "Select option",
  items,
}: BottomSheetSelectProps) {
  const [isVisible, setIsVisible] = useState(false);

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
              onPress={() => setIsVisible(true)}
            >
              <Text style={[styles.inputText, !value && styles.placeholder]}>
                {value
                  ? items.find((item) => item.value === value)?.label
                  : placeholder}
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={Colors.text.secondary}
              />
            </TouchableOpacity>

            <Modal
              visible={isVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setIsVisible(false)}
            >
              <Pressable
                style={styles.modalOverlay}
                onPress={() => setIsVisible(false)}
              >
                <View style={styles.bottomSheet}>
                  <View style={styles.header}>
                    <Text style={styles.headerTitle}>{label || "Select"}</Text>
                    <TouchableOpacity onPress={() => setIsVisible(false)}>
                      <Ionicons
                        name="close"
                        size={24}
                        color={Colors.text.primary}
                      />
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={styles.optionsList}>
                    {items.map((item) => (
                      <TouchableOpacity
                        key={item.value}
                        style={styles.optionItem}
                        onPress={() => {
                          onChange(item.value);
                          setIsVisible(false);
                        }}
                      >
                        <Text
                          style={[
                            styles.optionText,
                            value === item.value && styles.selectedOption,
                          ]}
                        >
                          {item.label}
                        </Text>
                        {value === item.value && (
                          <Ionicons
                            name="checkmark"
                            size={20}
                            color={Colors.primary}
                          />
                        )}
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </Pressable>
            </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.08)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: Colors.background.white,
    borderRadius: 40,
    maxHeight: "60%",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.default,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.lato.bold,
    color: Colors.text.primary,
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.default,
  },
  optionText: {
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    color: Colors.text.primary,
  },
  selectedOption: {
    color: Colors.primary,
    fontFamily: Fonts.lato.bold,
  },
});
