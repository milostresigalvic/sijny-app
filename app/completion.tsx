import React from "react";
import {
  View,
  ScrollView,
  Text,
  Pressable,
  Linking,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "@/app/style/live-styles";

export default function Screen({ navigation }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.sectionHeader}>
          <Text style={styles.title}> Payment successful</Text>
          <Text style={styles.content}>Thank You!</Text>
        </View>
        <View style={styles.youtubewrap}>
          <Text style={styles.youbutetitle}>Lorem Ipsum Dolor Sit Amet...</Text>
        </View>
      </ScrollView>
    </View>
  );
}
