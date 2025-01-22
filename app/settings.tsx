import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Modal,
  Pressable,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  fetchData,
  getCurrentDate,
  getNextFifteenDaysPrayerTimesGPS,
  getTimeZoneOffset,
} from "@/app/utils/helpers";
import * as Location from "expo-location";
import { useRouter, useNavigation } from "expo-router";
import * as Notifications from "expo-notifications";

const SettingsScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedSource, setSelectedSource] = useState(null);
  const [newsPush, setNewsPush] = useState(true);
  const [prayerTimes, setPrayerTimes] = useState({});
  const [switchStates, setSwitchStates] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);
  const [cityCountry, setCityCountry] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentKey, setCurrentKey] = useState(null); // To know which prayer time is being changed
  const [items] = useState([
    { label: "Silent", value: "Silent" },
    { label: "Vibrate", value: "Vibrate" },
    { label: "Adhaan", value: "Adhaan" },
  ]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the header title text
    });
  }, [navigation]);

  // Load settings from AsyncStorage
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSwitchStates =
          JSON.parse(await AsyncStorage.getItem("switchStates")) || {};
        const savedSource =
          (await AsyncStorage.getItem("_PT_SOURCE")) || "TIMETABLE";

        setSelectedSource(savedSource);
        const newsPush = (await AsyncStorage.getItem("newsPush")) === "true";
        setNewsPush(newsPush);
        const cityCountry = await AsyncStorage.getItem("_CITY_COUNTRY");
        setCityCountry(cityCountry);

        console.log("savedSwitchStates on load = ", savedSwitchStates);
        setSwitchStates(savedSwitchStates);
      } catch (e) {
        console.error("Failed to load the settings from storage", e);
      }
    };

    loadSettings();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Fetch prayer times from the API or GPS
  useEffect(() => {
    if (selectedSource) {
      const fetchDataBasedOnSource = async () => {
        if (selectedSource === "GPS") {
          fetchLocation();
        } else {
          fetchData(
            "https://buildme.website/sijny/wp-json/prayer-times/v1/data",
            async (data) => {
              const currentData = data.find((d) => d.Date === getCurrentDate());
              if (currentData) {
                setPrayerTimes(currentData);

                const isFirstTime =
                  (await AsyncStorage.getItem("isFirstTime")) === null;

                if (isFirstTime) {
                  const defaultSwitchStates = Object.keys(currentData)
                    .filter(
                      (key) =>
                        key !== "Date" &&
                        key !== "Islamic Date" &&
                        key !== "date"
                    )
                    .reduce((acc, key) => {
                      acc[key] = "Vibrate"; // Default option
                      return acc;
                    }, {});

                  setSwitchStates(defaultSwitchStates);
                  saveToStorage(
                    "switchStates",
                    JSON.stringify(defaultSwitchStates)
                  );

                  await AsyncStorage.setItem("isFirstTime", "false");
                }
              }
            },
            setLoading,
            setError
          );
        }
      };

      fetchDataBasedOnSource();
    }
  }, [selectedSource]);

  const saveToStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      console.error("Failed to save the data to the storage", e);
    }
  };

  const fetchLocation = async () => {
    setLoading(true);
    console.log("fetchLocation started");
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      setError("Permission to access location was denied");
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});

    console.log("loc.coords latitude = ", loc.coords.latitude);
    console.log("loc.coords longitude = ", loc.coords.longitude);

    const latitude = loc.coords.latitude;
    const longitude = loc.coords.longitude;
    const timezone = getTimeZoneOffset(); // Set your timezone (GMT offset)

    console.log("Current timezone: ", timezone);

    // Fetch prayer times for the next 15 days
    const pTimesGPS = getNextFifteenDaysPrayerTimesGPS(
      latitude,
      longitude,
      timezone
    );
    console.log("SETTINGS pTimesGPS = ", pTimesGPS);
    saveToStorage("_P_TIMES_GPS", JSON.stringify(pTimesGPS));

    setLocation(loc.coords);
  };

  const handleSourceChange = (source) => {
    setSelectedSource(source);

    saveToStorage("_PT_SOURCE", source);
  };

  const handleSwitchChange = (key, value) => {
    const updatedSwitchStates = { ...switchStates, [key]: value };
    console.log("updatedSwitchStates on change = ", updatedSwitchStates);
    setSwitchStates(updatedSwitchStates);
    saveToStorage("switchStates", JSON.stringify(updatedSwitchStates));
  };

  const handleNewsPushChange = (value) => {
    setNewsPush(value);
    saveToStorage("newsPush", value.toString());
  };

  const openModal = (key) => {
    setCurrentKey(key);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setCurrentKey(null);
  };

  const handleOptionSelect = (value) => {
    handleSwitchChange(currentKey, value);
    closeModal();
  };

  const scheduleTestNotifications = async () => {
    console.log("Checking Notifications ...");

    await Notifications.setNotificationChannelAsync("prayer_times_test", {
      name: "Prayer Times Test Notifications",
      importance: Notifications.AndroidImportance.MAX,
      enableVibrate: true,
      sound: "adhaan.wav", // Provide ONLY the base filename
    });

    const now = new Date();

    const scheduledTime = new Date(now.getTime() + 1 * 1000); // Schedule 10 seconds apart
    //const scheduledTime = new Date(2024, 11, 22, 14, 0);

    const notificationContent: Notifications.NotificationContentInput = {
      title: `Test Notification Successful`,
      body: `Your notifications are working.`,
      data: {
        //category: 'news',
        //postId: 11809,
        message:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ullamcorper, orci eu facilisis lacinia, justo odio condimentum purus, sed interdum libero nulla et tortor. Sed ac ante nunc. In sit amet ligula eu enim laoreet dignissim. Vivamus sit amet ipsum nunc. Ut sagittis purus turpis, et fermentum ligula sodales eu. Nulla id sapien ipsum.",
      },
      sound: "adhaan.wav", // <- for Android below 8.0
      vibrate: [0, 250, 250, 250],
      autoDismiss: false,
      interruptionLevel: "timeSensitive",
    };

    try {
      await Notifications.scheduleNotificationAsync({
        content: notificationContent,
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE, // Specify the trigger type
          date: scheduledTime,
          channelId: "prayer_times_test",
        },
      });
      console.log(`Scheduled notification for ${scheduledTime}`);
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <SafeAreaView>
        {cityCountry && (
          <View style={styles.valuesContainer}>
            <Text style={styles.valueText}>Location: {cityCountry}</Text>
          </View>
        )}

        {/* Prayer Times Source */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prayer Times Source</Text>

          <TouchableOpacity
            style={styles.sourceRow}
            onPress={() => handleSourceChange("GPS")}
          >
            <Text
              style={[
                styles.sourceText,
                selectedSource === "GPS" && styles.selectedText,
              ]}
            >
              GPS Coordinates
            </Text>
            {selectedSource === "GPS" && (
              <Text style={styles.checkMark}>✔</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sourceRow}
            onPress={() => handleSourceChange("TIMETABLE")}
          >
            <Text
              style={[
                styles.sourceText,
                selectedSource === "TIMETABLE" && styles.selectedText,
              ]}
            >
              Timetable via Najaf.org
            </Text>
            {selectedSource === "TIMETABLE" && (
              <Text style={styles.checkMark}>✔</Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Prayer Notifications with Modal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Prayer Notifications</Text>

          {Object.keys(prayerTimes)
            .filter(
              (key) =>
                key !== "Date" &&
                key !== "Islamic Date" &&
                key !== "date" &&
                key !== "Sunrise"
            )
            .map((key) => (
              <View key={key} style={styles.row}>
                <Text style={styles.text}>{key}</Text>
                <TouchableOpacity
                  onPress={() => openModal(key)}
                  style={styles.optionButton}
                >
                  <Text style={styles.optionButtonText}>
                    {switchStates[key] || "Vibrate"}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
        </View>

        {/* Push Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Push Notifications</Text>
          <View style={styles.row}>
            <Text style={styles.text}>News</Text>
            <Switch
              value={newsPush}
              onValueChange={handleNewsPushChange}
              thumbColor={newsPush ? "#fff" : "#fff"}
              trackColor={{ false: "red", true: "#fd5555" }}
            />
          </View>
        </View>

        {/* Modal for Options */}
        <Modal
          transparent={true}
          visible={modalVisible}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Notification Type</Text>
              {items.map((item) => (
                <Pressable
                  key={item.value}
                  onPress={() => handleOptionSelect(item.value)}
                  style={styles.modalOption}
                >
                  <Text style={styles.modalOptionText}>{item.label}</Text>
                </Pressable>
              ))}
              <Pressable onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Button
          title="Check Prayer Notification"
          onPress={scheduleTestNotifications} // Call the function on press
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  valuesContainer: {
    marginBottom: 40,
    backgroundColor: "#f7f7f7",
    padding: 10,
    borderRadius: 10,
  },
  valueText: {
    fontSize: 16,
    color: "#4b5568",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,

    marginBottom: 10,
    color: "#fff",
    backgroundColor: "#333333",
    padding: 15,
  },
  text: {
    fontSize: 16,
    paddingLeft: 20,
    color: "#071425",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 5,
  },
  optionButtonText: {
    fontSize: 16,
    color: "#4b5568",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOption: {
    paddingVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 16,
    color: "red",
  },
  sourceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingLeft: 20,
  },
  sourceText: {
    color: "#071425",
    fontSize: 15,
  },
  checkMark: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fd5555",
  },
  selectedText: {
    color: "#fd5555",
  },
});

export default SettingsScreen;
