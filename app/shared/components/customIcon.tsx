import { Ionicons } from "@expo/vector-icons";
import React from "react";

interface CustomIconProps {
  name: string;
  size?: number;
  color?: string;
}

export default function CustomIcon({
  name,
  size = 24,
  color = "#000",
}: CustomIconProps) {
  const getIoniconName = (iconName: string): keyof typeof Ionicons.glyphMap => {
    switch (iconName) {
      case "home":
        return "home";
      case "pmr":
        return "document-text";
      case "inventory":
        return "archive";
      case "account":
        return "person";
      default:
        return "ellipse";
    }
  };

  return <Ionicons name={getIoniconName(name)} size={size} color={color} />;
}
