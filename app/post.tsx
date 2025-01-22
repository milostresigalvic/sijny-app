import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
  Dimensions,
} from "react-native";
import he from "he"; // Import the he library
import postStyles from "@/app/style/post-styles";

import RenderHTML from "react-native-render-html"; // Import react-native-render-html
import { useRouter, useNavigation } from "expo-router";
import queryString from "query-string"; // Import query-string for parsing URL
import { useLocalSearchParams } from "expo-router";

const formatDate = (dateString) => {
  // Parse the date string into a Date object
  const date = new Date(dateString);

  // Options for the date formatter
  const options = { year: "numeric", month: "short", day: "2-digit" };

  // Create an Intl.DateTimeFormat object with the specified options
  const formatter = new Intl.DateTimeFormat("en-US", options);

  // Format the date
  return formatter.format(date);
};

export default function SinglePost() {
  const router = useRouter();
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "", // Remove the header title text
    });
  }, [navigation]);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const route = useRouter(); // Get the route object

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

  const { postId } = useLocalSearchParams();
  console.log("PostID:" + postId);

  useEffect(() => {
    if (postId) {
      setLoading(true);
      setPost(null);
      setError(null);

      https: fetchData(
        `https://sijny.org//wp-json/wp/v2/posts/${postId}`,
        setPost
      );
    } else {
      setError("No postId provided in the URL");
      setLoading(false);
    }
  }, [postId]);

  if (loading) {
    return (
      <View style={postStyles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={postStyles.loader}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  return (
    <View style={postStyles.container}>
      <ScrollView>
        <View>
          <View style={postStyles.sectionHeader}>
            <Text style={postStyles.title}> </Text>
          </View>
          {post && (
            <View key={post.id} style={postStyles.singlePostWrap}>
              <View style={postStyles.singlePostTitleDateWrap}>
                <Text style={postStyles.singlePostTitle}>
                  {he.decode(post.title.rendered)}
                </Text>
                <Text style={postStyles.singlePostDate}>
                  {formatDate(post.date)}
                </Text>
              </View>

              <View style={postStyles.singlePostContentDateWrap}>
                <RenderHTML
                  contentWidth={Dimensions.get("window").width}
                  source={{ html: post.content.rendered }}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
