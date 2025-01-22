import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { OneSignal } from "react-native-onesignal";

import { useColorScheme } from "@/hooks/useColorScheme";
import { StripeProvider } from "@stripe/stripe-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  //OneSignal.Debug.setLogLevel(LogLevel.Verbose);
  OneSignal.initialize("30b6c869-f5a1-4025-85bb-7c65929e1e56");
  OneSignal.Notifications.requestPermission(true);

  const [loaded] = useFonts({
    RobotoMedium: require("../assets/fonts/Roboto-Medium.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <StripeProvider publishableKey="pk_test_51Pew1sBooC2Kpt6BaZRZeLbjRF2uFj2sVnHuchCKcnDplBcAVmicWoJZ8i6y1P2e3rLwMkAoDQq53qxjqjkhX5aL00juRPYGhh">
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
          screenOptions={{
            headerShown: false,
            headerBackVisible: true, // Explicitly show back button
            headerBackTitle: "Back" // iOS only
          }}
        >
          {/* Add all your other screens here */}
          <Stack.Screen 
            name="times" // or whatever your screen name is
            options={{ 
              headerTitle: "",
              headerShown: true,
              headerBackVisible: true, // Explicitly show back button
            }} 
          />
          <Stack.Screen 
            name="events" // or whatever your screen name is
            options={{ 
              headerTitle: "",
              headerShown: true,
              headerBackVisible: true, // Explicitly show back button
           }} 
          />
          <Stack.Screen 
            name="news" // or whatever your screen name is
            options={{ 
              headerTitle: "",
              headerShown: true,
              headerBackVisible: true, // Explicitly show back button
           }} 
          />
          <Stack.Screen 
            name="live" // or whatever your screen name is
            options={{ 
              headerTitle: "",
              headerShown: true,
              headerBackVisible: true, // Explicitly show back button
           }} 
          />
          <Stack.Screen 
            name="settings" // or whatever your screen name is
            options={{ 
              headerTitle: "",
              headerShown: true,
              headerBackVisible: true, // Explicitly show back button
           }} 
          />
          <Stack.Screen 
            name="event" // or whatever your screen name is
            options={{ 
              headerTitle: "",
              headerShown: true,
              headerBackVisible: true, // Explicitly show back button
           }} 
          />
          <Stack.Screen 
            name="post" // or whatever your screen name is
            options={{ 
              headerTitle: "",
              headerShown: true,
              headerBackVisible: true, // Explicitly show back button
           }} 
          />
          <Stack.Screen 
            name="calendar" // or whatever your screen name is
            options={{ 
              headerTitle: "",
              headerShown: true,
              headerBackVisible: true, // Explicitly show back button
           }}
           
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ThemeProvider>
    </StripeProvider>
  );
}
