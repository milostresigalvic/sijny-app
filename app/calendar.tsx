import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from "react-native";
import { Calendar } from "react-native-calendars";
import calendarStyles from "@/app/style/calendar-styles";
import { fetchData } from "@/app/utils/helpers";
import { useRouter, useNavigation } from "expo-router";
import styles from "./style/calendar-styles";
import { SafeAreaView } from "react-native-safe-area-context";

const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const todayDate = getCurrentDate(); // Get today's date in YYYY-MM-DD format

// Filter dates for the current month and only include dates with events
const getDatesForCurrentMonth = (importantDates, currentMonth) => {
  //console.log("getDatesForCurrentMonth / importantDates = ", importantDates);
  //console.log("getDatesForCurrentMonth / currentMonth = ", currentMonth);

  const datesForMonth = {};
  const monthString = currentMonth.toISOString().slice(0, 7); // Format YYYY-MM

  for (const date in importantDates) {
    const eventDetails = importantDates[date];
    // Check if the event has a meaningful description
    const eventParts = eventDetails.split(",");

    // Assuming that an important event has more than just empty fields
    if (eventParts[2] && eventParts[2].trim() !== "") {
      if (date.startsWith(monthString)) {
        datesForMonth[date] = importantDates[date];
      }
    }
  }

  return datesForMonth;
};

const findEventForSelectedDate = (selectedDate, importantDates) => {
  for (const date in importantDates) {
    if (date === selectedDate) {
      return importantDates[date];
    }
  }
  return null;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

const IslamicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState();
  const [importantDates, setImportantDates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showEvent, setShowEvent] = useState();

  const router = useRouter();
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
    });
  }, [navigation]);

  useEffect(() => {
    fetchData(
      "https://buildme.website/sijny/wp-json/simple-csv-json/v1/data",
      (data) => {
        setImportantDates(data);
      },
      setLoading,
      setError
    );
  }, []);

  useEffect(() => {
    handleDayPress({ dateString: getCurrentDate() }); // Select today's date initially
  }, [importantDates]);

  useEffect(() => {
    // This will run whenever selectedDate changes
    console.log("Selected date updated to:", selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    // This will run whenever selectedDate changes
    console.log("Selected month updated to:", currentMonth);
  }, [currentMonth]);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);

    const eventForSelectedDate = findEventForSelectedDate(
      day.dateString,
      importantDates
    );

    if (eventForSelectedDate) {
      const eventParts = eventForSelectedDate.split(",");
      const formattedDate = eventParts[0]; // Extract the Islamic date part
      setShowEvent(formattedDate); // Set only the Islamic date part
    } else {
      setShowEvent(null); // No event for selected date
    }
  };

  const handleTodayPress = () => {
    const today = {
      dateString: getCurrentDate(),
    };

    setSelectedDate(today.dateString);
    setCurrentMonth(new Date());
    handleDayPress(today);
  };

  const importantDatesForMonth = getDatesForCurrentMonth(
    importantDates,
    currentMonth
  );

  // Prepare markedDates object for the calendar
  const markedDates = {
    [selectedDate]: {
      customStyles: {
        container: {
          borderColor: "navy", // Green border for selected date
          borderWidth: 2,
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff", // White background for selected date
          opacity: 1, // Ensure full opacity for selected date
        },
        text: {
          color: "navy", // Green text for selected date
          fontWeight: "bold",
        },
      },
    },
    [todayDate]: {
      customStyles: {
        container: {
          backgroundColor: "navy", // Green background for today's date
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center",
          opacity: 1, // Ensure full opacity for today's date
        },
        text: {
          color: "#fff", // White text for today's date
          fontWeight: "bold",
        },
      },
    },
  };

  // Highlight important dates with a green border
  Object.keys(importantDatesForMonth).forEach((date) => {
    if (date !== todayDate) {
      // Avoid overwriting today's date style
      const eventParts = importantDatesForMonth[date].split(",");

      if (eventParts[1] == "1") {
        markedDates[date] = {
          customStyles: {
            container: {
              borderColor: "#1e7248",
              backgroundColor: "#1e7248",
              borderWidth: 2,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            },
            text: {
              color: "white",
              fontWeight: "bold",
            },
          },
        };
      } else {
        markedDates[date] = {
          customStyles: {
            container: {
              borderColor: "black",
              backgroundColor: "black",
              borderWidth: 2,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            },
            text: {
              color: "white",
              fontWeight: "bold",
            },
          },
        };
      }
    }
  });

  const handleMonthChange = (month) => {
    const firstDayOfMonth = `${month.year}-${String(month.month).padStart(
      2,
      "0"
    )}-01`;
    setCurrentMonth(new Date(firstDayOfMonth));
    setSelectedDate(firstDayOfMonth); // Automatically select the first day of the new month
    handleDayPress({ dateString: firstDayOfMonth }); // Call handleDayPress with the new date
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
    <ScrollView>
      <View style={calendarStyles.container}>
        <View style={calendarStyles.sectionHeaderWrap}>
          <View
            style={[calendarStyles.sectionHeader, { alignItems: "center" }]}
          >
            <Text style={calendarStyles.title}>Islamic Calendar</Text>
          </View>
          <View
            style={[
              calendarStyles.sectionHeader,
              {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <View style={calendarStyles.dateAndEvent}>
              <Text style={calendarStyles.dateAndEventText}>
                {selectedDate ? formatDate(selectedDate) : "No date selected"}
              </Text>
              <Text style={calendarStyles.dateAndEventText}>
                {showEvent}, 1446
              </Text>
            </View>
            <Pressable
              onPress={handleTodayPress}
              style={({ pressed }) => [
                { opacity: pressed ? 0.5 : 1 },
                calendarStyles.todayButtonPressable,
              ]}
            >
              <Text style={styles.todayButton}>Today</Text>
            </Pressable>
          </View>
        </View>

        <View style={calendarStyles.callendar}>
          <Calendar
            style={{
              borderRadius: 10,
            }}
            theme={{
              calendarBackground: "#fff",
              textSectionTitleColor: "d9e1e8",
              selectedDayTextColor: "#fff",
              todayTextColor: "#1e7248",
              dayTextColor: "#2d4150",
              textDisabledColor: "#d9e1e8",
              arrowColor: "#1e7248",
              monthTextColor: "2d4150",
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
            current={selectedDate}
            key={selectedDate}
            onDayPress={handleDayPress}
            markingType={"custom"} // Enable custom styles
            markedDates={markedDates} // Pass the updated markedDates object
            onMonthChange={handleMonthChange} // Use the new handler
            dayComponent={({ date, state }) => {
              const lunarDateRaw =
                importantDates[date.dateString]?.split(",")[0] || ""; // Extract Lunar date
              const lunarDay = lunarDateRaw.match(/\d+/)?.[0] || ""; // Only numeric part
              const gregorianDay = date.day; // Gregorian day

              const backgroundColor =
                markedDates[date.dateString]?.customStyles?.container
                  ?.backgroundColor || "transparent";
              const isMarked = !!markedDates[date.dateString];

              return (
                <Pressable
                  onPress={() =>
                    handleDayPress({ dateString: date.dateString })
                  }
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    minWidth: 30,
                    padding: 2,
                    backgroundColor: isMarked ? backgroundColor : "transparent",
                  }}
                >
                  <View style={{ alignItems: "center" }}>
                    {/* Display Gregorian Date */}
                    <Text
                      style={{
                        color: isMarked
                          ? "white"
                          : state === "disabled"
                          ? "gray"
                          : "black",
                      }}
                    >
                      {gregorianDay}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
        </View>

        <View style={styles.sectionSubHeaderWrapTop}>
          <View>
            <Text style={styles.sectionSubHeader}>
              Important Dates for This Month
            </Text>
            <View style={calendarStyles.dateAndEventTextWrap}>
              {Object.entries(importantDatesForMonth).map(
                ([date, event], index) => {
                  const eventParts = event.split(",");
                  const eventName = eventParts[2];
                  return (
                    <View
                      key={index}
                      style={calendarStyles.importantDateAndEventText}
                    >
                      <Text style={calendarStyles.callendarEventName}>
                        {" "}
                        {eventName}
                      </Text>

                      <Text style={calendarStyles.callendarEventDate}>
                        {formatDate(date)}
                      </Text>
                    </View>
                  );
                }
              )}
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default IslamicCalendar;
