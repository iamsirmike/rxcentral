import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function BackButton() {
  return (
    <TouchableOpacity onPress={() => router.dismiss()}>
      <View style={styles.container}>
        <Ionicons name="chevron-back" color={"#888888"} size={18} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: 34,
    width: 34,
    backgroundColor: "#D6D6D666",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
});
