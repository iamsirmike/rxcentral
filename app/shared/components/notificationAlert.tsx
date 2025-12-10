import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";
import { Fonts } from "../constants/fonts";

interface NotificationAlertProps {
  message: string;
}

export default function NotificationAlert({ message }: NotificationAlertProps) {
  return (
    <View style={styles.alertContainer}>
      <Ionicons name="alarm" size={20} color={"#E77612"} />
      <View style={{ flex: 1, width: "80%", paddingRight: 10 }}>
        <Text style={{ fontFamily: Fonts.lato.regular }}>{message}</Text>
      </View>
      <View style={styles.avatar}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontFamily: Fonts.lato.bold,
    fontWeight: "700",
    color: Colors.text.primary,
    marginBottom: 8,
  },
  icon: {
    color: "#888888",
  },
  searchIconContainer: {
    backgroundColor: "#D6D6D666",
    height: 30,
    width: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE1C7",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginTop: 20,
    gap: 15,
    width: "100%",
    overflow: "hidden",
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: "#E77612",
    position: "absolute",
    right: -10,
    bottom: -10,
  },
});
