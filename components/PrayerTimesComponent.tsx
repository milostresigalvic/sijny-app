import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PrayerTimesComponent = ({ prayerTimes, currentIslamicDate }) => {
  const [selectedTimes, setselectedTimes] = useState({});
  const [selectedSource, setSelectedSource] = useState();
  console.log("PrayerTimesComponent - prayerTimes = ", prayerTimes);
  console.log(
    "PrayerTimesComponent - currentIslamicDate = ",
    currentIslamicDate
  );

  useFocusEffect(
    useCallback(() => {
      const loadSettings = async () => {
        try {
          console.log();
          const savedSwitchStates =
            JSON.parse(await AsyncStorage.getItem("switchStates")) || {};
          setselectedTimes(savedSwitchStates);

          const selectedSource =
            (await AsyncStorage.getItem("_PT_SOURCE")) || "TIMETABLE";
          setSelectedSource(selectedSource);
        } catch (e) {
          console.error("Failed to load the settings from storage", e);
        }
      };
      loadSettings();
    }, [])
  );

  //console.log("selectedTimes => ", selectedTimes);
  //console.log("prayerTimes => ", prayerTimes);

  // Function to format the current date
  const formatDate = () => {
    const date = new Date();
    const day = date.toLocaleString("en-US", { weekday: "long" });
    const month = date.toLocaleString("en-US", { month: "long" });
    const dayNum = date.getDate();
    const year = date.getFullYear();

    const paddedMonth = String(date.getMonth() + 1).padStart(2, "0");
    const paddedDayNum = String(dayNum).padStart(2, "0");

    return `${day}  ${paddedDayNum} ${month}  ${year} `;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconWithText}>
          <Text style={styles.headerDate}>{formatDate()}</Text>
        </View>
      </View>

      <View style={styles.homeTimesWrap}>
        {Object.keys(prayerTimes).map((key) => {
          if (key !== "Date" && key !== "date" && key !== "Islamic Date") {
            // Check if selectedTimes is empty or if the specific time is selected
            const shouldDisplay =
              Object.keys(selectedTimes).length === 0 || selectedTimes[key];

            //if (shouldDisplay) {
            return (
              <View key={key} style={styles.textContainer}>
                <Text style={styles.label}>{key}</Text>
                <Text style={styles.value}>{prayerTimes[key]}</Text>
              </View>
            );
          }
          //}
          return null;
        })}
      </View>
      <View style={styles.undertimestextWrap}>
        <Text style={styles.undertimestext}>
          {selectedSource === "TIMETABLE"
            ? "Source: SIJNY Timetable"
            : "Source: GPS"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#1b7248",
    width: "100%",

    elevation: 0,
    maxWidth: "95%",
    alignSelf: "center",
    borderRadius: 10,
    borderRadius: 10, // Applies a border radius to the entire header
    borderBottomWidth: 6, // Sets the bottom border width
    borderBottomColor: "#e3e3e3",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  undertimestextWrap: {
    width: "100%",
    paddingTop: 3,
    paddingBottom: 7,
  },
  undertimestext: {
    color: "#fff",
    textAlign: "center",
    width: "100%",
    fontSize: 10,
    fontWeight: 400,
  },
  header: {
    width: "100%",
    backgroundColor: "#071425",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 15,
    paddingBottom: 12,
    borderRadius: 7,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  headerTitle: {
    fontSize: 26,
    color: "#fff",
    fontFamily: "RobotoRegular",
    fontWeight: "300",
  },
  headerDate: {
    fontSize: 12,
    color: "#fff",
    paddingTop: 0,
    fontFamily: "RobotoRegular",
  },

  iconWithText: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },

  headerSubtitle: {
    fontSize: 11,
    color: "#fff",
  },
  homeTimesWrap: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 10,
  },
  textContainer: {
    width: "16%",
    margin: "0.3%",
    marginBottom: 10,
    paddingBottom: 0,
    paddingTop: 2,
    fontFamily: "RobotoRegular",
    textAlign: "center",
  },
  label: {
    textAlign: "center",
    paddingBottom: 1,
    color: "#fff",
    fontFamily: "RobotoRegular",
    textTransform: "capitalize",
    alignSelf: "center",
    marginBottom: 7,
    fontSize: 10,
  },
  value: {
    // margin: "auto",
    alignSelf: "center",
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "RobotoBold",
    fontSize: 13,
    color: "#fff",
  },
});

export default PrayerTimesComponent;
