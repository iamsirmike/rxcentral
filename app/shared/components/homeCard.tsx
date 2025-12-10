import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/colors";
import { Fonts } from "../constants/fonts";

interface NotificationAlertProps {
  value: string;
  label: string;
  color: string;
  statLabel?: string;
  statValue?: string;
}

export default function HomeCard({
  value,
  label,
  color,
  statLabel,
  statValue,
}: NotificationAlertProps) {
  return (
    <View style={[styles.container, color ? { backgroundColor: color } : null]}>
      <View style={styles.iconContainer}>
        <Image source={require("../../../assets/images/onlylogo.png")} />
      </View>
      <View style={styles.content}>
        <Text style={styles.valueText}> {value} </Text>
        <Text style={styles.labelText}> {label} </Text>
        {statLabel && statValue && (
          <View>
            <Text style={styles.statLabel}>{statLabel}</Text>
            <Text style={styles.statValue}>{statValue}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.white,
    height: 220,
    width: 250,
    marginTop: 60,
    borderRadius: 20,
    marginRight: 20,
  },
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: -30,
    left: 30,
    backgroundColor: "#FCFCFC",
    borderRadius: 50,
    height: 70,
    width: 70,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    marginTop: 60,
    marginLeft: 30,
  },
  valueText: {
    fontSize: 36,
    fontFamily: Fonts.lato.bold,
    fontWeight: "700",
    color: Colors.text.white,
  },
  labelText: {
    fontSize: 18,
    fontFamily: Fonts.lato.regular,
    fontWeight: "400",
    color: Colors.text.white,
    marginTop: 6,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: Fonts.lato.regular,
    fontWeight: "400",
    color: Colors.text.white,
    marginTop: 20,
  },
  statValue: {
    fontSize: 16,
    fontFamily: Fonts.lato.regular,
    fontWeight: "500",
    color: Colors.text.white,
    marginTop: 6,
  },
});
