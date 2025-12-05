import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function AccountScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Account</Text>
        <Text style={styles.subtitle}>Manage your account settings</Text>

        {/* We'll add account settings here later */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Account management features coming soon...
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
});
