import {
  Lato_100Thin,
  Lato_100Thin_Italic,
  Lato_300Light,
  Lato_300Light_Italic,
  Lato_400Regular,
  Lato_400Regular_Italic,
  Lato_700Bold,
  Lato_700Bold_Italic,
  Lato_900Black,
  Lato_900Black_Italic,
  useFonts,
} from "@expo-google-fonts/lato";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreenExpo from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import SplashScreen from "./shared/components/SplashScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreenExpo.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);

  const [fontsLoaded] = useFonts({
    Lato_100Thin,
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
    Lato_100Thin_Italic,
    Lato_300Light_Italic,
    Lato_400Regular_Italic,
    Lato_700Bold_Italic,
    Lato_900Black_Italic,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreenExpo.hideAsync();
      // Simulate app loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Show splash for 3 seconds

      return () => clearTimeout(timer);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isLoading) {
    return <SplashScreen />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen
          name="features/account/signin"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="features/account/signup"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
