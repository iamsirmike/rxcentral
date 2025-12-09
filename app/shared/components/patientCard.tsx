import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/colors";
import { Fonts } from "../constants/fonts";

interface PatientCardProps {
  name: string;
  prescription: string;
  onTap?: () => void;
}

export default function PatientCard({
  name,
  prescription,
  onTap,
}: PatientCardProps) {
  return (
    <TouchableOpacity onPress={onTap}>
      <View style={[styles.container]}>
        <View>
          <Text style={styles.nameText}>{name}</Text>
          <Text style={styles.prescriptionText}>{prescription}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={"#1D74B973"} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.white,
    height: 61,
    width: "100%",
    marginTop: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  nameText: {
    fontSize: 16,
    fontFamily: Fonts.lato.bold,
    fontWeight: "500",
    color: "#4B4B4B",
  },
  prescriptionText: {
    fontSize: 14,
    fontFamily: Fonts.lato.regular,
    fontWeight: "400",
    color: "#838383",
    marginTop: 6,
  },
});
