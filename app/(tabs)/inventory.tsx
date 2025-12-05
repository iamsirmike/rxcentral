import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function InventoryScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Inventory</Text>
        <Text style={styles.subtitle}>Manage medication stock levels</Text>

        {/* We'll add inventory list here later */}
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>
            Inventory management features coming soon...
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
