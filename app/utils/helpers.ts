import {
  StripePaymentIntentRequestBody,
  StripePaymentIntentResponse,
} from "@/app/utils/types";
import PrayTimes from "@/app/utils/PrayTimes";

export const getTimeZoneOffset = () => {
  const timezoneOffsetMinutes = new Date().getTimezoneOffset();
  const timezoneOffsetHours = -(timezoneOffsetMinutes / 60); // convert minutes to hours and invert the sign
  return timezoneOffsetHours;
};
export const getCurrentDateV2 = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Helper function to get prayer times for the next 15 days
export const getNextFifteenDaysPrayerTimesGPS = (
  latitude,
  longitude,
  timezone
) => {
  const prayTimes = new PrayTimes("ISNA"); // Choose the method, e.g., 'ISNA', 'MWL', etc.
  const fifteenDaysPrayerTimes = [];
  const currentDate = new Date();

  for (let i = 0; i < 15; i++) {
    // Get the date for the current day + i days
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() + i);

    // Get prayer times for this day
    const times = prayTimes.getTimes(date, [latitude, longitude], timezone);

    // Store date and times
    fifteenDaysPrayerTimes.push({
      date: date.toISOString().slice(0, 10), // Format date as YYYY-MM-DD
      times,
    });
  }

  return fifteenDaysPrayerTimes;
};

export async function createPaymentIntentClientSecret({
  amount,
  currency,
}: StripePaymentIntentRequestBody): Promise<StripePaymentIntentResponse> {
  try {
    console.log("Starting Payment Intent request...");
    console.log(
      "Requesting Payment Intent from:",
      `${process.env.EXPO_PUBLIC_BACKEND_SERVICE_URL_DEV}stripe-payment-intent`
    );
    console.log("Amount:", amount, "Currency:", currency);

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_BACKEND_SERVICE_URL_DEV}stripe-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
        }),
      }
    );

    // Log the status and response
    console.log("Response status:", response.status);

    const data = await response.json();
    console.log("Response data:", data); // Log the response

    const { clientSecret, customer } = data;

    // Log the received values
    console.log("Client Secret:", clientSecret);
    console.log("Customer:", customer);

    if (!clientSecret || !customer) {
      const errorMessage = "Could not get clientSecret or customer from Stripe";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    console.log("Payment Intent successfully created.");
    return { clientSecret, customer };
  } catch (error) {
    console.log("Fetch error:", error);
    return {
      clientSecret: null,
      customer: null,
    };
  }
}

export const getNextFifteenDays = () => {
  const options = { day: "numeric", month: "short", year: "2-digit" };
  const dates = [];

  for (let i = 0; i < 15; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + i);

    const intlFormatter = new Intl.DateTimeFormat("en", options);
    const parts = intlFormatter.formatToParts(currentDate);
    const day = parts.find((part) => part.type === "day").value;
    const month = parts.find((part) => part.type === "month").value;
    const year = parts.find((part) => part.type === "year").value;

    dates.push(`${day}.${month}.${year}`);
  }

  return dates;
};

export const getCurrentDate = () => {
  const options = { day: "numeric", month: "short", year: "2-digit" };
  const currentDate = new Date();
  const intlFormatter = new Intl.DateTimeFormat("en", options);
  const parts = intlFormatter.formatToParts(currentDate);
  const day = parts.find((part) => part.type === "day").value;
  const month = parts.find((part) => part.type === "month").value;
  const year = parts.find((part) => part.type === "year").value;
  return `${day}.${month}.${year}`;
};

// export const formatDateFromLineToDotSepareted = (dateStr) => {
//   // Extract day, month, and year parts from "01-Jan-24"
//   const [day, month, year] = dateStr.split("-");

//   // Remove any leading zero from the day
//   const dayWithoutZero = parseInt(day, 10);

//   // Reformat date as "1.Jan.24"
//   return `${dayWithoutZero}.${month}.${year}`;
// };
export const formatDateFromLineToDotSepareted = (dateStr) => {
  let separator = dateStr.includes(".") ? "." : "-";
  const [day, month, year] = dateStr.split(separator);

  const dayWithoutZero = parseInt(day, 10);

  return `${dayWithoutZero}.${month}.${year}`;
};
export const fetchCSVFromURL = async () => {
  try {
    const response = await fetch(
      "https://buildme.website/sijny/wp-content/uploads/2025/01/Prayer_Times_with_Updated_Date_Format-2.csv"
    );
    //console.log("Response status:", response.status);

    const csvContent = await response.text();
    //console.log("CSV Content:", csvContent);

    if (!csvContent) {
      //console.error("CSV content is empty or not valid.");
      return null;
    }

    const rows = csvContent.split(/\r?\n/);

    //console.log("rows = ", rows);

    let jsonResult = rows.slice(1).map((row, index) => {
      let [Date, Imsak, Fajr, Sunrise, Zuhr, Sunset, Maghrib] = row.split(",");

      Date = formatDateFromLineToDotSepareted(Date);

      console.log(`Row ${index + 1}:`, row); // Log each row
      return { Date, Imsak, Fajr, Sunrise, Zuhr, Sunset, Maghrib };
    });

    // Iterate through the array and clean up the "Maghrib" field
    jsonResult = jsonResult.map((entry) => {
      if (entry.Maghrib) {
        entry.Maghrib = entry.Maghrib.replace(";", ""); // Remove the ";" from Maghrib
      }
      return entry;
    });

    //console.log("jsonResult = ", jsonResult);
    return jsonResult;
  } catch (error) {
    console.error("Error fetching CSV file:", error);
    return null;
  }
};

///
// Helper function to format dates to "YYYY-MM-DD"
export const formatDateGPS = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed, so add 1
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const convertDateToCustomFormat = (dateString) => {
  //(e.g., 2024-10-09" to  "1.Jan.24"

  const date = new Date(dateString);

  const day = String(date.getDate()); // Get day
  const monthAbbr = date.toLocaleString("en", { month: "short" }); // Get abbreviated month (e.g., Jan)
  const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of year (e.g., 24)

  return `${day}.${monthAbbr}.${year}`;
};

// Generate a list of dates from today and the next 14 days
export const getNext15DaysGPS = () => {
  const today = new Date();
  const dates = [];

  for (let i = 0; i < 15; i++) {
    const currentDate = new Date();
    currentDate.setDate(today.getDate() + i);
    dates.push(formatDateGPS(currentDate));
  }

  return dates;
};
///
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  const formatter = new Intl.DateTimeFormat("en-US", options);
  return formatter.format(date);
};

export const convertToLocalTimestamp = (originalTimestamp) => {
  console.log("convertToLocalTimestamp", originalTimestamp);
  // Parse the original timestamp to a Date object
  const date = new Date(originalTimestamp);

  // Get the time zone offset in minutes and convert to hours and minutes
  const timezoneOffset = -date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) % 60;

  // Format the offset with the sign
  const formattedOffset =
    (timezoneOffset >= 0 ? "+" : "-") +
    String(offsetHours).padStart(2, "0") +
    ":" +
    String(offsetMinutes).padStart(2, "0");

  // Replace 'Z' in the original timestamp with the formatted offset
  const localTimestamp = originalTimestamp.replace("Z", formattedOffset);
  console.log("localTimestamp = ", localTimestamp);
  return localTimestamp;
};

export const fetchData = async (url, setData, setLoading, setError) => {
  setLoading(true);
  try {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
  } catch (err) {
    setError(err);
  } finally {
    setLoading(false);
  }
};

export const convertTo24Hour = (time) => {
  const [timeString, period] = time.split(" ");
  let [hours, minutes] = timeString.split(":").map(Number);

  if (period === "PM" && hours < 12) {
    hours += 12;
  } else if (period === "AM" && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

export const convertPrayerTimesTo24hFormat = (prayerTimes) => {
  //console.log("prayerTimes init = ", prayerTimes);
  // List of keys that need to be converted to 24-hour format
  const convertTo24HourKeys = [
    // "Zuhr Adhan",
    //"Zuhr Iqamah",
    "Asr Adhan",
    "Asr",
    "Maghrib Azan / Iftar",
    "Maghrib Iqamah",
    "Isha Adhan",
    "Isha Iqamah",
    "Maghrib",
    //"Zuhr",
    "Duhr",
    "Sunset",
  ];

  // Create a new object to hold the modified prayer times
  const modifiedPrayerTimes = {};

  for (let key in prayerTimes) {
    let time = prayerTimes[key];

    // Convert to 24-hour format if the key is in the list
    if (convertTo24HourKeys.includes(key)) {
      time = convertTo24Hour(`${time} ${time.includes("AM") ? "AM" : "PM"}`);
    }

    // Add the (possibly modified) time to the new object
    modifiedPrayerTimes[key] = time;
  }

  //console.log("modifiedPrayerTimes  = ", modifiedPrayerTimes);
  return modifiedPrayerTimes;
};
