// storageUtils.ts
import { Platform } from "react-native";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";

const fileUri = FileSystem.documentDirectory + "selectedSource.txt";
const fileGpsTimes = FileSystem.documentDirectory + "GpsTimes.txt";
const selectedPrayerTimes =
  FileSystem.documentDirectory + "selectedPrayerTimes";
let fileToUse;

export const saveValue = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error("Error saving value", error);
  }
};

export const loadValue = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.error("Error loading value", error);
  }
  return null;
};

export const writeToFile = async (source, content) => {
  // console.log("content = " + content);
  // console.log(
  //   "writeToFile =>=======>=====> " + source + " / conent = " + content
  // );
  if (Platform.OS === "web") {
    console.log(
      "web write to file source = " +
        source +
        " content = " +
        JSON.stringify(content)
    );
    content = JSON.stringify(content);
    await AsyncStorage.setItem(source, content);
  } else {
    content = JSON.stringify(content); // Ensure content is a string

    if (source === "selectedSource") {
      fileToUse = fileUri;
    }
    if (source === "gpsTimes") {
      fileToUse = fileGpsTimes;
    }
    if (source === "selectedPrayerTimes") {
      fileToUse = selectedPrayerTimes;
    }

    // console.log(
    //   "ios/andr write to file source = " +
    //     fileToUse +
    //     " content = " +
    //     JSON.stringify(content)
    // );

    await FileSystem.writeAsStringAsync(fileToUse, content, {
      encoding: FileSystem.EncodingType.UTF8,
    });
  }
};

export const readFile = async (sourceFile) => {
  //console.log("sourceFile   '''''' = " + sourceFile);
  try {
    if (Platform.OS === "web") {
      const source = await AsyncStorage.getItem(sourceFile);
      if (source) {
        console.log(
          //"WEB read file from source = " + sourceFile +
          " content = " + JSON.stringify(source)
        );

        return JSON.parse(source);
      } else {
        console.log("No content found in AsyncStorage for key: " + sourceFile);
        return null;
      }
    } else {
      if (sourceFile === "selectedSource") {
        fileToUse = fileUri;
      }
      if (sourceFile === "gpsTimes") {
        fileToUse = fileGpsTimes;
      }
      if (sourceFile === "selectedPrayerTimes") {
        fileToUse = selectedPrayerTimes;
      }

      const fileExists = await FileSystem.getInfoAsync(fileToUse);
      if (fileExists.exists) {
        const source = await FileSystem.readAsStringAsync(fileToUse, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        if (source) {
          try {
            const parsedSource = JSON.parse(source);

            // console.log(
            //   "IOS read file from source = " +
            //     fileToUse +
            //     " content = " +
            //     parsedSource
            // );

            return parsedSource; // Parse the JSON content
          } catch (parseError) {
            console.error("Error parsing JSON content:", parseError);
            return source; // Return as is if parsing fails
          }
        } else {
          console.log("No content found in file at: " + fileToUse);
          return null;
        }
      } else {
        // console.log(
        //   "web write to file source = " +
        //     fileToUse +
        //     " content = " +
        //     JSON.stringify(content)
        // );
        return null;
      }
    }
  } catch (error) {
    console.error("Error reading selected source:", error);
    return null;
  }
};
