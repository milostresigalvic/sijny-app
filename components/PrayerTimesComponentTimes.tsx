import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { loadValue } from "@/app/utils/storageUtils";

const PrayerTimesComponent = ({ prayerTimes }) => {
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    width: "100%",

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
    width: "100%",

    paddingBottom: 0,
    paddingTop: 0,
    fontFamily: "RobotoRegular",
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row", // Arrange children in a row
    justifyContent: "space-between", // Ensure space between the two items
    alignItems: "left", // Center them vertically
    width: "100%", // Ensure the container takes full width
  },
  label: {
    textAlign: "center",
    paddingBottom: 5,
    color: "#333333",
    fontFamily: "RobotoRegular",
    flex: 1,
    marginBottom: 0,
    fontSize: 15,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    paddingVertical: 14,
  },
  value: {
    flex: 1,
    textAlign: "center",
    fontFamily: "RobotoBold",
    marginBottom: 0,
    fontSize: 14,
    color: "#333333",
    paddingVertical: 14,
  },
});

export default PrayerTimesComponent;
