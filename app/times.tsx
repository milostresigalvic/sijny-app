import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import timesStyles from "@/app/style/times-styles";
import PrayerTimesComponentCalendarTimes from "@/components/PrayerTimesComponentTimes";
import {
  fetchData,
  convertPrayerTimesTo24hFormat,
  fetchCSVFromURL,
} from "@/app/utils/helpers";
import { useNavigation } from "expo-router";
import styles from "./style/times-styles";

const getCurrentDate = (date = new Date()) => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const formatDate = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const day = days[date.getDay()];
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = months[date.getMonth()];
  const yyyy = date.getFullYear();

  return `${day}, ${dd}. ${mm} ${yyyy}`;
};

const IslamicCalendar = () => {
  const [times, setTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTimes, setCurrentTimes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the header title text
    });
  }, [navigation]);

  useEffect(() => {
    async function loadCSVData() {
      const data = await fetchCSVFromURL();

      setTimes(data);
      setLoading(false);

      const today = getCurrentDate();
      setSelectedDate(new Date(today));

      const todayTimes = data.find(
        (d) =>
          formatDateFromApi(d.Date) ===
          `${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(
            new Date().getDate()
          ).padStart(2, "0")}`
      );
      setCurrentTimes(todayTimes || {});
    }
    loadCSVData();
  }, []);

  const formatDateFromApi = (dateString) => {
    const [day, month, year] = dateString.split(".");
    const months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };
    return `${months[month]}-${day.padStart(2, "0")}`; // Samo mesec i dan
  };

  const handleDayChange = (direction) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + direction);
    setSelectedDate(newDate);

    const formattedNewDate = `${String(newDate.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(newDate.getDate()).padStart(2, "0")}`;

    const selectedTimes = times.find(
      (d) => formatDateFromApi(d.Date) === formattedNewDate
    );

    if (selectedTimes) {
      setCurrentTimes(selectedTimes);
    } else {
      setCurrentTimes({});
    }
  };

  const handleTodayPress = () => {
    const today = new Date();
    setSelectedDate(today);

    const formattedToday = `${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;

    const todayTimes = times.find(
      (d) => formatDateFromApi(d.Date) === formattedToday
    );
    setCurrentTimes(todayTimes || {});
  };

  if (loading) {
    return (
      <View style={timesStyles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={timesStyles.loader}>
        <Text>Error loading data: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={timesStyles.container}>
        <View style={[timesStyles.sectionHeader, { alignItems: "center" }]}>
          <Text style={timesStyles.title}> Prayer Times</Text>
        </View>
        <View style={timesStyles.testSection}>
          <Pressable
            onPress={() => handleDayChange(-1)}
            style={timesStyles.arrowButton}
          >
            <View style={timesStyles.iconContainer}>
              <FontAwesome5
                name="angle-left"
                size={24}
                style={timesStyles.icon}
              />
            </View>
          </Pressable>
          <Text style={timesStyles.monthYear}>{formatDate(selectedDate)}</Text>
          <Pressable
            onPress={() => handleDayChange(1)}
            style={timesStyles.arrowButton}
          >
            <View style={timesStyles.iconContainer}>
              <FontAwesome5
                name="angle-right"
                size={24}
                style={timesStyles.icon}
              />
            </View>
          </Pressable>
        </View>

        <View>
          {currentTimes.Date ? (
            <PrayerTimesComponentCalendarTimes
              prayerTimes={convertPrayerTimesTo24hFormat(currentTimes)}
            />
          ) : (
            <Text>No prayer times found for selected date.</Text>
          )}
        </View>
        <View style={styles.mtButtonWrap}>
          <Pressable
            onPress={() => navigation.navigate("monthlyTimes")}
            style={({ pressed }) => [
              { opacity: pressed ? 0.5 : 1 },
              timesStyles.mpTimes,
              { flex: 0.5 },
            ]}
          >
            <Text style={styles.mtButton}>Monthly Timings</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default IslamicCalendar;
