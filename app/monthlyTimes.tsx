import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import PrayerTimesComponentCalendarTimes from "@/components/PrayerTimesComponentTimes";
import calendarStyles from "@/app/style/monthly-times-styles";
import {
  fetchData,
  convertPrayerTimesTo24hFormat,
  fetchCSVFromURL,
} from "@/app/utils/helpers";
import { useRouter, Stack } from "expo-router";

// Make sure getCurrentDate returns the date in the format yyyy-MM-dd
const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

// Format date to "Monday, 12. December 2024"
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

  return `${day} ${mm}  ${dd}   `;
};

// Configure calendar locale
LocaleConfig.locales["en"] = {
  monthNames: [
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
  ],
  monthNamesShort: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  dayNames: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
};
LocaleConfig.defaultLocale = "en";

const MonthlyTimes = () => {
  const [times, setTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getCurrentDate());
  const [currentTimes, setCurrentTimes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const router = useRouter();

  useEffect(() => {
    async function loadCSVData() {
      const data = await fetchCSVFromURL();
      setTimes(data);
      setLoading(false);

      const today = getCurrentDate();
      const formattedToday = `${String(new Date().getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(new Date().getDate()).padStart(2, "0")}`;

      const todayTimes = data.find(
        (d) => formatDateFromApi(d.Date) === formattedToday
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
    return `${months[month]}-${day.padStart(2, "0")}`;
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);

    const formattedSelectedDate = `${day.dateString.slice(5)}`; // MM-DD
    const selectedTimes = times.find(
      (d) => formatDateFromApi(d.Date) === formattedSelectedDate
    );

    setCurrentTimes(selectedTimes || {});
    setCurrentMonth(new Date(day.timestamp));
  };

  const handleTodayPress = () => {
    const today = new Date();
    setSelectedDate(getCurrentDate());

    const formattedToday = `${String(today.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(today.getDate()).padStart(2, "0")}`;

    const todayTimes = times.find(
      (d) => formatDateFromApi(d.Date) === formattedToday
    );

    setCurrentTimes(todayTimes || {});
    setCurrentMonth(today);
  };

  if (loading) {
    return (
      <View style={calendarStyles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={calendarStyles.loader}>
        <Text>Error loading data: {error.message}</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShown: true,
          headerBackVisible: true,
        }}
      />
      <ScrollView>
        <View style={calendarStyles.container}>
          <View
            style={[calendarStyles.sectionHeader, { alignItems: "center" }]}
          >
            <Text style={calendarStyles.title}>Monthly Prayer Times</Text>
          </View>
          <View style={calendarStyles.buttonWrap}>
            <Pressable
              onPress={handleTodayPress}
              style={({ pressed }) => [
                { opacity: pressed ? 0.8 : 1 },
                calendarStyles.todayButton,
                { flex: 0.5 },
              ]}
            >
              <Text style={calendarStyles.todayButtonText}>Today</Text>
            </Pressable>
          </View>

          <View style={calendarStyles.callendar}>
            <Calendar
              renderHeader={(date) => {
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-US",
                  {
                    month: "long",
                    year: "numeric",
                  }
                );
                return (
                  <Text style={{ color: "#fff", fontSize: 13 }}>
                    {formattedDate}
                  </Text>
                );
              }}
              current={getCurrentDate()}
              onDayPress={handleDayPress}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  borderRadius: 0,
                  selectedColor: "#488bff",
                },
              }}
              onMonthChange={(month) =>
                setCurrentMonth(
                  `${month.year}-${String(month.month).padStart(2, "0")}-01`
                )
              }
              theme={{
                arrowColor: "#fff", // Set the arrow color (e.g., red)
                "stylesheet.calendar.header": {
                  header: {
                    backgroundColor: "#c09400", // Header background color
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                  },
                  week: {
                    backgroundColor: "#333333", // Set the background color for the days of the week
                    flexDirection: "row",
                    justifyContent: "space-around",
                    paddingTop: 10,
                    paddingBottom: 6,
                  },
                  dayHeader: {
                    color: "#ffffff", // Text color for the day headers (Sun, Mon, etc.)
                    fontSize: 14,
                    fontWeight: "bold",
                    textAlign: "center",
                  },
                },
              }}
            />
          </View>
          <View style={calendarStyles.timesWrap}>
            <Text
              style={[
                calendarStyles.monthYear,
                { flex: 0.5, textAlign: "center" },
              ]}
            >
              {formatDate(new Date(currentMonth))}
            </Text>
            {currentTimes.Date ? (
              <PrayerTimesComponentCalendarTimes
                prayerTimes={convertPrayerTimesTo24hFormat(currentTimes)}
              />
            ) : (
              <Text>No prayer times found for selected date.</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default MonthlyTimes;
