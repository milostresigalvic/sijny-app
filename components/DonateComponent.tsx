import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";
import { useRouter, useNavigation, Link } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";

const DonateComponent = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);

  const handleDonatePress = () => {
    console.log("Donate Pressed");
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => router.push("donate")}
        onPressIn={() => setIsPressed(true)}
        onPressOut={() => setIsPressed(false)}
        style={[styles.donateButton, isPressed && styles.donateButtonPressed]}
        activeOpacity={1} // This removes the opacity change on press
      >
        <Text style={styles.buttonText}>
          Donate <FontAwesome5 name="angle-right" size={15} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  donateButton: {
    position: "absolute",
    bottom: 0,
    right: 16,
    backgroundColor: "#1b7248",
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 40,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  donateButtonPressed: {
    backgroundColor: "#1b7248",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "700",
    letterSpacing: 0.6,
  },
});

export default DonateComponent;
