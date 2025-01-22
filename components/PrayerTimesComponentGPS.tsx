import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { loadValue } from "@/app/utils/storageUtils";

const PrayerTimesComponentGPS = ({ prayerTimes }) => {
  const [selectedPrayerTimes, setSelectedPrayerTimes] = useState({
    fajr: true,
    imsak: true,
    isha: true,
    maghrib: true,
    midnight: true,
    sunrise: true,
    sunset: true,
  });

  // Function to format the current date
  const formatDate = () => {
    const date = new Date();
    const day = date.toLocaleString("en-US", { weekday: "short" });
    const month = date.toLocaleString("en-US", { month: "short" });
    const dayNum = date.getDate();
    const year = date.getFullYear();

    return `${day} ${month} ${dayNum} / ${year}-${
      date.getMonth() + 1
    }-${dayNum}`;
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadSelectedPrayerTimes = async () => {
        const savedPrayerTimes = JSON.parse(
          await loadValue("PRAYERTIMESTOSHOW")
        );

        if (savedPrayerTimes) {
          console.log(
            "savedPrayerTimes ===================== " + savedPrayerTimes
          );
          setSelectedPrayerTimes(savedPrayerTimes);
        }
      };
      loadSelectedPrayerTimes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Replace prayerTimes["date"] with formatted date */}
        <Text style={styles.headerDate}>{formatDate()}</Text>
      </View>

      {selectedPrayerTimes.fajr && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Fajr:</Text>
          <Text style={styles.value}>{prayerTimes["fajr"]}</Text>
        </View>
      )}
      {selectedPrayerTimes.imsak && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Imsak:</Text>
          <Text style={styles.value}>{prayerTimes["imsak"]}</Text>
        </View>
      )}
      {selectedPrayerTimes.isha && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Isha:</Text>
          <Text style={styles.value}>{prayerTimes["isha"]}</Text>
        </View>
      )}
      {selectedPrayerTimes.maghrib && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Maghrib:</Text>
          <Text style={styles.value}>{prayerTimes["maghrib"]}</Text>
        </View>
      )}
      {selectedPrayerTimes.midnight && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Midnight:</Text>
          <Text style={styles.value}>{prayerTimes["midnight"]}</Text>
        </View>
      )}
      {selectedPrayerTimes.sunrise && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Sunrise:</Text>
          <Text style={styles.value}>{prayerTimes["sunrise"]}</Text>
        </View>
      )}
      {selectedPrayerTimes.sunset && (
        <View style={styles.textContainer}>
          <Text style={styles.label}>Sunset:</Text>
          <Text style={styles.value}>{prayerTimes["sunset"]}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "DodgerBlue",
    width: "100%",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
    elevation: 0,
    maxWidth: "95%",
    margin: "auto",
    borderRadius: 10,
  },
  header: {
    width: "100%",
    backgroundColor: "#4b5568",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 20,
    borderRadius: 5,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerTitle: {
    fontSize: 24,
    color: "#fff",
    fontFamily: "RobotoRegular",
    fontWeight: "300",
  },
  headerDate: {
    fontSize: 12,
    color: "#fff",
    paddingTop: 10,
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#fff",
  },
  textContainer: {
    width: "13.5%",
    margin: "0.3%",
    alignItems: "flex-start",
    marginBottom: 10,
    paddingBottom: 0,
    paddingTop: 2,
    fontFamily: "RobotoRegular",
    textAlign: "center",
  },
  label: {
    textAlign: "center",
    paddingBottom: 5,
    fontFamily: "RobotoRegular",
    margin: "auto",
    marginBottom: 0,
    fontSize: 10,
  },
  value: {
    margin: "auto",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "RobotoBold",
    marginBottom: 0,
    fontSize: 14,
  },
});

export default PrayerTimesComponentGPS;
