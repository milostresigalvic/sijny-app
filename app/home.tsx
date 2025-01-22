import React, { useEffect, useState, useCallback } from "react";
import he from "he"; // Add this import

import {
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
  Linking,
  Platform,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import PrayerTimesComponent from "@/components/PrayerTimesComponent";
import Icon from "react-native-vector-icons/Ionicons";
import {
  getCurrentDate,
  getCurrentDateV2,
  getNext15DaysGPS,
  convertDateToCustomFormat,
  getNextFifteenDays,
  fetchData,
  formatDate,
  convertPrayerTimesTo24hFormat,
  fetchCSVFromURL,
} from "@/app/utils/helpers";
import styles from "./style/HomeScreenStyles";
import { BoxSection, NewsItem, EventItem } from "@/components/HomeComponents";
import DonateComponent from "@/components/DonateComponent";
import * as Notifications from "expo-notifications";
import {
  AndroidImportance,
  AndroidNotificationPriority,
} from "expo-notifications";
import ModalComponent from "./components/modal";

function openPortal() {
  Linking.openURL("#");
}

export const SectionHeader = ({ icon, title }) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.title}>
      <Icon name={icon} size={17} color="#071425" /> {title}
    </Text>
  </View>
);

export default function HomeScreen() {
  const [imageHeight, setImageHeight] = useState(0);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [jsonTimes, setTimes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const router = useRouter();
  const navigation = useNavigation();
  const [currentIslamicDate, setCurrentIslamicDate] = useState("");
  const [modalState, setModalState] = useState({
    visible: false,
    title: "",
    message: "",
  });

  const toggleModal = (
    visible: boolean,
    title?: string,
    message?: string
  ): void => {
    setModalState((prevState) => ({
      ...prevState,
      visible,
      title: title ?? prevState.title,
      message: message ?? prevState.message,
    }));
  };

  const closeModal = () => {
    toggleModal(false);
  };

  const onImageLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    const aspectRatio = 2.41;
    const calculatedHeight = width / aspectRatio;
    setImageHeight(calculatedHeight);
  };

  const fetchIslamicDate = async () => {
    try {
      const response = await fetch(
        "https://buildme.website/sijny//wp-json/simple-csv-json/v1/data"
      );
      const data = await response.json();
      const today = getCurrentDateV2(); // Get today’s date in the required format (e.g., YYYY-MM-DD)

      if (data[today]) {
        const rawDate = data[today];
        const formattedDate = rawDate.split(",")[0]; // Extract "Rabi Al Thaani 28" from the string
        setCurrentIslamicDate(formattedDate);
      } else {
        console.log("No data found for today");
      }
    } catch (error) {
      console.error("Error fetching Islamic date:", error);
    }
  };

  const loadSettings = async () => {
    try {
      const selectedSource =
        (await AsyncStorage.getItem("_PT_SOURCE")) || "TIMETABLE";
    } catch (e) {
      console.error("Failed to load settings from AsyncStorage", e);
    }
  };

  const fetchPrayerTimes = async () => {
    const selectedSource =
      (await AsyncStorage.getItem("_PT_SOURCE")) || "TIMETABLE";

    const compareDatesIgnoringYear = (date1, date2) => {
      const [day1, month1] = date1.split(".");
      const [day2, month2] = date2.split(".");
      // console.log("cdiy  = ", day1 === day2 && month1 === month2, day1, month1);
      return day1 === day2 && month1 === month2; // Ignoriše godinu
    };

    if (selectedSource === "TIMETABLE") {
      // Use data from the CSV instead of the external URL
      const csvData = await fetchCSVFromURL();

      // Assuming csvData is in the correct format after fetching

      const currentDate = getCurrentDate();

      console.log("currentDate = ", currentDate, "csvData = ", csvData);

      //const currentData = csvData.find((d) => d.Date === currentDate);

      const currentData = csvData.find((d) =>
        compareDatesIgnoringYear(d.Date, currentDate)
      );

      const nextFifteenDays = getNextFifteenDays();
      const aggregatedTimes = nextFifteenDays.reduce((acc, date) => {
        const currentData = csvData.find((d) => d.Date === date);
        if (currentData) {
          acc.push({ date, ...currentData });
        }
        return acc;
      }, []);

      // Set the times for the next 15 days
      setTimes(aggregatedTimes || {});
    } else {
      // Existing code for GPS-based data
      const prayerTimesGpsRaw = await AsyncStorage.getItem("_P_TIMES_GPS");
      const prayerTimesGps = prayerTimesGpsRaw
        ? JSON.parse(prayerTimesGpsRaw)
        : null;

      if (prayerTimesGps && Array.isArray(prayerTimesGps)) {
        const datesToCheck = getNext15DaysGPS();
        const filteredTimesArray = [];

        // Find any items where the date matches today's date or the next 14 days
        const foundItems = prayerTimesGps.filter((item) =>
          datesToCheck.includes(item.date)
        );

        if (foundItems.length > 0) {
          foundItems.forEach((foundItem) => {
            // Create a new object with only Fajr, Maghrib, Sunrise, and Dhuhr times
            const filteredTimes = {
              date: convertDateToCustomFormat(foundItem.date),
              Imsak: foundItem.times.imsak,
              Fajr: foundItem.times.fajr,
              Sunrise: foundItem.times.sunrise,
              Zuhr: foundItem.times.dhuhr, // Zuhr is called 'dhuhr' in the dataset
              Sunset: foundItem.times.sunset,
              Maghrib: foundItem.times.maghrib,
            };

            filteredTimesArray.push(filteredTimes);
          });
          console.log("HOME filteredTimesArray GPS  = ", filteredTimesArray);
          setTimes(filteredTimesArray);
        } else {
          console.log("No matching dates found in prayerTimesGps");
        }
      }
    }
  };

  const fetchPostsAndEvents = async () => {
    fetchData(
      "https://sijny.org.uk//wp-json/wp/v2/posts",
      setPosts,
      setLoading,
      setError
    );
    fetchData(
      "https://sijny.org.uk/wp-json/tribe/events/v1/events",
      (data) => {
        setEvents(data.events || []);
      },
      setLoading,
      setError
    );
  };

  const handleNotification = (content: Notifications.NotificationContent) => {
    const data = content.data;
    if (data.category === "news") {
      fetchData(
        "https://sijny.org.uk//wp-json/wp/v2/posts",
        (posts: any) => {
          router.push(`post?postId=${posts[0].id}`);
        },
        () => {},
        () => {}
      );
    } else if (data.postId) {
      router.push(`post?postId=${data.postId}`);
    } else if (data.message) {
      toggleModal(true, content.title || "", data.message);
    }
  };

  useEffect(() => {
    async function loadCSVData() {
      const csvData = await fetchCSVFromURL();
      //console.log("CSV Data: " + JSON.stringify(csvData, null, 2));
    }
    loadCSVData();

    const notificationResponseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { notification } = response;
        handleNotification(notification.request.content);
      });

    return () => {
      notificationResponseListener.remove();
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const loadAndFetch = async () => {
        await loadSettings();
        await fetchPostsAndEvents();

        await fetchPrayerTimes();
        await fetchIslamicDate(); // Fetch the current Islamic date when the screen is focused
        await Notifications.setNotificationHandler({
          handleNotification: async () => ({
            priority: AndroidNotificationPriority.MAX,
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          }),
        });
        await schedulePrayerNotifications(); // Schedule notifications on page load
        setSettingsLoaded(true);
      };
      loadAndFetch(); //Uncomment
    }, [])
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0 }}>
        <ScrollView>
          <View style={styles.logoWrap}>
            <Image
              source={require("../assets/images/main-logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <View style={styles.bannerWrap}>
            <Image
              source={require("../assets/images/sijnyCentre.png")}
              style={[styles.banner, { height: imageHeight }]}
              resizeMode="cover"
              onLayout={onImageLayout}
            />
          </View>

          <PrayerTimesComponent
            currentIslamicDate={currentIslamicDate}
            prayerTimes={convertPrayerTimesTo24hFormat(jsonTimes[0])}
          />

          <BoxSection
            router={router}
            openPortal={openPortal}
            setModalVisible={() => {}}
          />

          <View style={styles.news}>
            <SectionHeader icon="megaphone" title="News & Announcements" />
            {posts.slice(0, 3).map((post) => (
              <Pressable
                key={post.id}
                onPress={() => router.push(`post?postId=${post.id}`)}
              >
                <NewsItem
                  key={post.id}
                  title={he.decode(post.title.rendered)}
                  date={formatDate(post.date)}
                />
              </Pressable>
            ))}
          </View>

          <View style={styles.eventswrap}>
            <SectionHeader icon="calendar-outline" title="Upcoming Events" />
            {events.length > 0 ? (
              events.slice(0, 5).map((event) => (
                <Pressable
                  key={event.id}
                  onPress={() => router.push(`event?postId=${event.id}`)}
                >
                  <EventItem
                    key={event.id}
                    title={he.decode(event.title)}
                    date={formatDate(event.start_date)}
                  />
                </Pressable>
              ))
            ) : (
              <Text style={styles.noevents}>There are no upcoming events.</Text>
            )}
          </View>
        </ScrollView>

        <ModalComponent
          visible={modalState.visible}
          title={modalState.title}
          message={modalState.message}
          onClose={closeModal}
        />
      </SafeAreaView>
      <DonateComponent />
    </View>
  );
}

function convertTo24Hour(time) {
  const [timeString, period] = time.split(" ");
  let [hours, minutes] = timeString.split(/[:;]/).map(Number);

  if (period === "PM" && hours !== 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

function parseDateTime(time, date) {
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

  const [day, monthAbbr, year] = date.split(".");

  const fullDate = `20${year}-${months[monthAbbr]}-${day.padStart(2, "0")}`;
  const dateTimeString = `${fullDate}T${time}:00`;

  const dateTime = new Date(dateTimeString);

  return dateTime;
}

function getMonthNumber(monthAbbr) {
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

  return months[monthAbbr];
}

// function combineDateTime(dateStr, timeStr) {
//   const convertedDate = convertDate(dateStr);
//   const dateTimeString = `${convertedDate}T${timeStr}:00.000Z`;
//   const dateObject = new Date(dateTimeString);

//   return dateObject.toISOString();
// }
function combineDateTime(dateStr, timeStr) {
  const convertedDate = convertDate(dateStr);
  const [year, month, day] = convertedDate.split("-");
  const [hours, minutes] = timeStr.split(":");

  const dateObject = new Date(
    parseInt(year),
    parseInt(month) - 1,
    parseInt(day),
    parseInt(hours),
    parseInt(minutes)
  );

  return dateObject;
}

function convertDate(dateStr) {
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

  const [day, monthAbbr, year] = dateStr.split(".");

  const month = months[monthAbbr];
  const fullYear = `20${year}`;

  return `${fullYear}-${month}-${day.padStart(2, "0")}`;
}

// Function to fetch prayer times from the API
async function fetchPrayerTimes() {
  try {
    const response = await fetch(
      "https://buildme.website/sijny//wp-json/simple-csv-json/v1/data"
    );
    const data = await response.json();
    return data; // Assuming the data is in the expected format
  } catch (error) {
    console.error("Error fetching prayer times:", error);
    return [];
  }
}

// Main function to schedule notifications
export async function schedulePrayerNotifications() {
  try {
    await cancelAllNotifications();
  } catch (error) {
    console.error("Error canceling notifications:", error);
  }

  console.log("Scheduling prayer times ...");

  await Notifications.setNotificationChannelAsync("prayer_times", {
    name: "Prayer Times Notifications",
    importance: AndroidImportance.MAX,
    enableVibrate: true,
  });

  await Notifications.setNotificationChannelAsync("prayer_times_adhaan", {
    name: "Prayer Times Adhaan Notifications",
    importance: AndroidImportance.MAX,
    enableVibrate: true,
    sound: "adhaan.wav", // Provide ONLY the base filename
  });

  const prayerTimes = await fetchCSVFromURL();
  const savedSwitchStatesRaw = await AsyncStorage.getItem("switchStates");
  const savedSwitchStates = savedSwitchStatesRaw
    ? JSON.parse(savedSwitchStatesRaw)
    : {};

  const now = new Date();
  let notificationsScheduled = false;

  //console.log("PrayerTimes Fetched: " + JSON.stringify(prayerTimes));
  //console.log("Length of Array: " + prayerTimes.length)
  let counter = 0;
  for (const prayer of prayerTimes) {
    const date = prayer.Date; // Assuming the date is in the format "DD.MM.YYYY"

    //console.log("Date: " + date);

    let prayerTimesForDay = convertPrayerTimesTo24hFormat(prayer);

    for (const key of Object.keys(prayerTimesForDay)) {
      if (
        key !== "Date" &&
        key !== "Imsak" &&
        key !== "Sunrise" &&
        key !== "Sunset" &&
        counter <= 50
      ) {
        // Skip the date key
        const timeIn24Hour = prayerTimesForDay[key]; //convertTo24Hour(`${time} ${time.includes("AM") ? "AM" : "PM"}`);
        const scheduledDateTime = combineDateTime(date, timeIn24Hour);

        //console.log(`Processing ${key} for ${date}: ${scheduledDateTime}`);

        // Schedule notification only if the time is in the future
        if (scheduledDateTime > now) {
          const notificationContent: Notifications.NotificationContentInput = {
            title: `Time for ${key} prayers`,
            body: `".. and the remembrance of Allah is greater" [29:45]`,
            sound: savedSwitchStates[key] === "Adhaan" ? "adhaan.wav" : false,
            autoDismiss: false,
            interruptionLevel: "timeSensitive",
          };

          console.log("Switch key: " + savedSwitchStates[key]);
          await Notifications.scheduleNotificationAsync({
            content: notificationContent,
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.DATE, // Specify the trigger type
              date: scheduledDateTime,
              channelId:
                savedSwitchStates[key] === "Adhaan"
                  ? "prayer_times_adhaan"
                  : "prayer_times",
            },
          });

          console.log(
            `Scheduled notification for ${key} at ${scheduledDateTime}`
          );
          counter++;
          notificationsScheduled = true;
        } else {
          //console.log(`Skipped scheduling for ${key} at ${scheduledDateTime} because the time has already passed.`);
        }
      }
    }
  }

  if (!notificationsScheduled) {
    console.log("No notifications were scheduled.");
  } else {
    console.log("PrayerTimes scheduling complete");
  }
}

export async function cancelAllNotifications() {
  //console.log("Fetching all scheduled notifications before canceling...");

  console.log("Attempting to cancel notifications ...");
  await Notifications.cancelAllScheduledNotificationsAsync();

  console.log("All scheduled notifications have been canceled.");
}

export async function requestNotificationPermissions() {
  console.log("Requesting notification permissions.");
  if (Platform.OS === "web") {
    console.log("Notifications are not supported on the web.");
    return;
  }

  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.log("Notification permissions not granted!");
  } else {
    console.log("Notification permissions granted.");
  }
}
