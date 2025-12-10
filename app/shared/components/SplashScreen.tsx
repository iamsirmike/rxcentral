import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Colors from "../constants/colors";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  return (
    <LinearGradient
      colors={[Colors.gradient.start, Colors.gradient.end]}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.content}>
        <Image source={require("../../../assets/images/logo.png")} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    height,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.text.white,
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
  },
});
