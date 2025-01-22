import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
} from "react-native";
import he from "he";
import eventStyles from "@/app/style/event-styles";
import RenderHTML from "react-native-render-html";
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router";
import getMonthName from "@/app/utils/helpers";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "short", day: "2-digit" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
};

function formatMonth(monthNumber) {
  return monthNumber < 10
    ? monthNumber.toString().replace(/^0+/, "")
    : monthNumber.toString();
}

export default function HomeScreen() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const route = useRouter();

  const { postId } = useLocalSearchParams();
  console.log("PostID:" + postId);

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

  const fetchData = async (url, setData) => {
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

  useEffect(() => {
    if (postId) {
      setLoading(true);
      setPost(null);
      setError(null);
      fetchData(
        `https://hyderi.org.uk/wp-json/tribe/events/v1/events/${postId}`,
        setPost
      );
    } else {
      setError("No postId provided in the URL");
      setLoading(false);
    }
  }, [postId]);

  if (loading) {
    return (
      <View style={eventStyles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={eventStyles.loader}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get("window").width;
  const calculatedHeight =
    post?.image?.width && post?.image?.height
      ? (screenWidth * post.image.height) / post.image.width
      : 200; // Default height if dimensions are unavailable

  return (
    <View style={eventStyles.container}>
      <SafeAreaView>
        <ScrollView>
          <View>
            <View style={eventStyles.sectionHeader}></View>
            <View style={eventStyles.eventContent}>
              {post && (
                <View key={post.id} style={eventStyles.post}>
                  <View style={eventStyles.eventsheaderWrap}>
                    <View style={eventStyles.eventsheader}>
                      <Text style={eventStyles.postTitle}>
                        {he.decode(post.title)}
                      </Text>
                      <Text style={eventStyles.postDate}>
                        {formatMonth(post.start_date_details.day)}{" "}
                        {months[post.start_date_details.month - 1]}
                      </Text>
                    </View>
                  </View>

                  <View style={eventStyles.eventContentWrap}>
                    {/* Render image if available, with dynamic height */}
                    {post.image?.url && (
                      <Image
                        source={{ uri: post.image.url }}
                        style={{
                          width: "100%",
                          height: calculatedHeight,
                          marginTop: 10,
                        }}
                        resizeMode="cover"
                      />
                    )}
                    {/* Render post description if available */}
                    {post.description && (
                      <RenderHTML
                        contentWidth={screenWidth}
                        source={{ html: post.description }}
                      />
                    )}
                    <Text style={eventStyles.postDate}>
                      Date: {formatMonth(post.start_date_details.day)}{" "}
                      {months[post.start_date_details.month - 1]}
                    </Text>
                    <Text style={eventStyles.postDate}>
                      Time: {post.start_date_details.hour}:
                      {post.start_date_details.minutes} -{" "}
                      {post.end_date_details.hour}:
                      {post.end_date_details.minutes}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
