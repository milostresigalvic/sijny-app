import React, { useState } from "react";
import { Pressable, Image, Text, View, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "@/app/style/HomeScreenStyles";
import ContactModal from "@/components/ContactModal";
import { Link } from "expo-router";

export const Box = ({ text, iconSource, onPress }) => (
  <Pressable style={styles.box} onPress={onPress}>
    <View style={styles.boxContent}>
      <Image
        source={iconSource}
        style={styles.icon} // Adjust size and styling in `styles.icon`
        resizeMode="contain"
      />
      <Text style={styles.boxText}>{text}</Text>
    </View>
  </Pressable>
);

export const SahifaBox = ({ text, onPress }) => (
  <Pressable style={styles.box} onPress={onPress}>
    <View style={styles.boxContent}>
      <Image
        source={require("@/assets/images/shafia.png")}
        style={styles.sahifaimage}
        resizeMode="contain"
      />
      <Text style={styles.boxText}>{text}</Text>
    </View>
  </Pressable>
);

export const BoxSection = ({ router, openPortal }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.boxSectionWrap}>
      <View style={styles.boxSection}>
        <Box
          text="Times"
          iconSource={require("@/assets/images/i1.jpg")}
          onPress={() => router.push("monthlyTimes")}
        />
        <Box
          text="Events"
          iconSource={require("@/assets/images/i2.jpg")}
          onPress={() => router.push("events")}
        />
        <Box
          text="Watch Live"
          iconSource={require("@/assets/images/i3.jpg")}
          onPress={() => router.push("https://www.youtube.com/c/hyderi")}
        />
        <Box
          text="Calendar"
          iconSource={require("@/assets/images/i4.jpg")}
          onPress={() => router.push("calendar")}
        />
        <Box
          text="News"
          iconSource={require("@/assets/images/i5.jpg")}
          onPress={() => router.push("news")}
        />
        <Box
          text="About Us"
          iconSource={require("@/assets/images/i6.jpg")}
          onPress={() => router.push("https://hyderi.org.uk/about-us/")}
        />
        <Box
          text="Contact"
          iconSource={require("@/assets/images/i7.jpg")}
          onPress={() => setModalVisible(true)}
        />
        <Box
          text="Settings"
          iconSource={require("@/assets/images/i8.jpg")}
          onPress={() => router.push("settings")}
        />
      </View>
      <ContactModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

export const SectionHeader = ({ icon, title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.title}>
      <Icon name={icon} size={17} color="#4b5568" /> {title}
    </Text>
  </View>
);

export const NewsItem = ({ title, date }) => (
  <View style={styles.post}>
    <Text style={styles.postTitle}>{title}</Text>
    <Text style={styles.postDate}>{date}</Text>
  </View>
);

export const EventItem = ({ title, date }) => (
  <View style={styles.event}>
    <Text style={styles.eventTitle}>{title}</Text>
    <Text style={styles.eventDate}>{date}</Text>
  </View>
);
