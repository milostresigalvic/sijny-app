import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import he from "he";
import eventsStyles from "@/app/style/events-styles";
import newsStyles from "@/app/style/news-styles";
import { useRouter } from "expo-router";

// Function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
  return formatter.format(date);
};

export default function HomeScreen() {
  const [events, setEvents] = useState([]); // All events
  const [loading, setLoading] = useState(true); // Initial loading state
  const [page, setPage] = useState(1); // Current page
  const [hasMore, setHasMore] = useState(true); // Whether more pages are available
  const [isFetching, setIsFetching] = useState(false); // Prevent multiple API calls
  const [error, setError] = useState(null);

  const router = useRouter();

  // Function to fetch events
  const fetchEvents = async (currentPage) => {
    try {
      setIsFetching(true); // Prevent additional API calls
      console.log(`Fetching events for page ${currentPage}...`);
      const response = await fetch(
        `https://hyderi.org.uk/wp-json/tribe/events/v1/events?per_page=50&page=${currentPage}`
      );
      const json = await response.json();

      console.log(
        `Fetched ${json.events.length} events for page ${currentPage}`
      );

      // If API returns fewer than 50 events or if total events exceed 1000, stop fetching
      if (
        json.events.length < 50 ||
        events.length + json.events.length >= 1000
      ) {
        setHasMore(false);
      }

      // Add new events to the existing list
      setEvents((prevEvents) => [
        ...prevEvents,
        ...json.events.slice(0, 1000 - prevEvents.length), // Limit to 1000 total events
      ]);
    } catch (err) {
      setError(err.toString());
      console.error("Error fetching events:", err.toString());
    } finally {
      setLoading(false);
      setIsFetching(false); // Allow the next call
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  // Function to load the next page
  const loadMoreEvents = () => {
    if (!isFetching && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePress = (eventId) => {
    if (!eventId) {
      console.error("Event ID is undefined");
      return;
    }
    router.push(`event?postId=${eventId}`);
  };

  if (loading && events.length === 0) {
    return (
      <View style={eventsStyles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={eventsStyles.loader}>
        <Text>Error loading data: {error}</Text>
      </View>
    );
  }

  return (
    <View style={newsStyles.container}>
      <ScrollView
        style={eventsStyles.container}
        onScroll={({ nativeEvent }) => {
          const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
          if (
            layoutMeasurement.height + contentOffset.y >=
              contentSize.height - 20 &&
            !isFetching &&
            hasMore
          ) {
            loadMoreEvents();
          }
        }}
        scrollEventThrottle={400}
      >
        <View style={eventsStyles.sectionHeader}>
          <Text style={eventsStyles.title}>Upcoming Events</Text>
        </View>
        {events.length === 0 ? (
          <View style={eventsStyles.noEventsContainer}>
            <Text style={eventsStyles.noEventsText}>
              There are no upcoming events.
            </Text>
          </View>
        ) : (
          events.map((event) => (
            <View
              key={event.id}
              style={[newsStyles.postWrap, { marginBottom: 5 }]}
            >
              <TouchableOpacity onPress={() => handlePress(event.id)}>
                <View style={eventsStyles.eventsItem}>
                  <Text style={eventsStyles.postTitle}>
                    {he.decode(event.title)}
                  </Text>
                  <Text style={eventsStyles.postDate}>
                    {event.start_date ? formatDate(event.start_date) : "N/A"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
        {hasMore && isFetching && (
          <View style={eventsStyles.loader}>
            <ActivityIndicator size="small" color="#0000ff" />
            <Text>Loading more events...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
