import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import Colors from "../shared/constants/colors";
import { Fonts } from "../shared/constants/fonts";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.background.white,
        headerShown: false,
        tabBarLabelStyle: {
          justifyContent: "center",
          alignItems: "center",
          fontSize: 12,
          fontFamily: Fonts.lato.bold,
          marginTop: 2,
        },
        tabBarIconStyle: {
          justifyContent: "center",
          alignItems: "center",
          marginTop: 5,
        },
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
        },
        tabBarStyle: {
          backgroundColor: "#155281",
          marginBottom: 16,
          marginHorizontal: 20,
          height: 70,
          borderRadius: 50,
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="pmr"
        options={{
          title: "PMR",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="archive" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
