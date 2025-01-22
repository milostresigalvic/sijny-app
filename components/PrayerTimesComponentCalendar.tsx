import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { loadValue } from "@/app/utils/storageUtils";

const PrayerTimesComponent = ({ prayerTimes }) => {
  console.log("PrayerTimesComponent ->", prayerTimes);

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

    const paddedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const paddedDayNum = String(dayNum).padStart(2, "0");

    return `${day} ${month} ${paddedDayNum} / ${year}-${paddedMonth}-${paddedDayNum}`;
  };

  useFocusEffect(
    React.useCallback(() => {
      const loadSelectedPrayerTimes = async () => {
        const prayerTimesToBeShown = JSON.parse(
          await loadValue("PRAYERTIMESTOSHOW")
        );

        if (prayerTimesToBeShown) {
          console.log(
            "prayerTimesToBeShown ===================== " +
              JSON.stringify(prayerTimesToBeShown)
          );

          setSelectedPrayerTimes(prayerTimesToBeShown);
        }
      };
      loadSelectedPrayerTimes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Replace prayerTimes["Date"] with formatted date */}
        <Text style={styles.headerDate}>{formatDate()}</Text>
      </View>

      {console.log("selectedPrayerTimes", selectedPrayerTimes)}
      {console.log("prayerTimes", prayerTimes)}

      {Object.keys(prayerTimes).map((key) => {
        const lowerCaseKey = key.toLowerCase();
        if (key !== "Date" && key !== "Islamic Date") {
          return (
            <View key={key} style={styles.textContainer}>
              <Text style={styles.label}>{key}</Text>
              <Text style={styles.value}>{prayerTimes[key]}</Text>
            </View>
          );
        }
        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#1b7248",
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
    color: "#fff",
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
    fontSize: 15,
    color: "#fff",
  },
});

export default PrayerTimesComponent;
