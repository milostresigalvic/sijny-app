import React from "react";
import { View, Text } from "react-native";
import { useRouter, useNavigation } from "expo-router";
export default function ContactScreen() {
  const router = useRouter();
const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the header title text
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Contact Screen</Text>
    </View>
  );
}
