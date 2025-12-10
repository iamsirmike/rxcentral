import Colors from "@/app/shared/constants/colors";
import { Fonts } from "@/app/shared/constants/fonts";
import { router } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VerificationSuccessScreen() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.dismissAll(); // Navigate to main app after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatar}>
        <Image
          source={require("../../../assets/images/sucessicon.png")}
          style={{ height: 80, width: 80 }}
        />
      </View>
      <Text style={styles.header}>Success!</Text>
      <Text style={styles.subTitle}>
        Your account has successfully been verified
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: 100,
    width: 100,
    backgroundColor: "rgba(238, 238, 238, 0.7)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    color: Colors.text.primary,
    fontFamily: Fonts.lato.bold,
    paddingTop: 20,
    textAlign: "center",
  },
  subTitle: {
    fontSize: 16,
    color: "#7B7B7B",
    fontFamily: Fonts.lato.bold,
    paddingTop: 20,
    textAlign: "center",
  },
});
