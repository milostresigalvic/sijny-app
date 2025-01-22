import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  View,
  ScrollView,
  Text,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from "react-native";

import he from "he";
import newsStyles from "@/app/style/news-styles";
import { formatDate } from "@/app/utils/helpers";
import { useRouter, useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const PostBox = React.memo(({ text, onPress }) => (
  <Pressable style={newsStyles.pressableArea} onPress={onPress}>
    <Text style={newsStyles.postBoxText}>{text}</Text>
  </Pressable>
));

export default function HomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://sijny.org//wp-json/wp/v2/posts?per_page=10"
      );
      const json = await response.json();
      setPosts(json);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderedPosts = useMemo(
    () =>
      posts.map((post) => (
        <View key={post.id} style={newsStyles.post}>
          <PostBox
            text={he.decode(post.title.rendered)}
            onPress={() => router.push(`post?postId=${post.id}`)}
          />
          <Text style={newsStyles.postDate}>{formatDate(post.date)}</Text>
        </View>
      )),
    [posts, navigation]
  );

  if (loading) {
    return (
      <View style={newsStyles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    console.error(error);
    return (
      <View style={newsStyles.loader}>
        <Text>Error loading data: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={newsStyles.container}>
      <ScrollView>
        <View style={newsStyles.news}>
          <View style={newsStyles.sectionHeader}>
            <Text style={newsStyles.title}>News & Announcements</Text>
          </View>
          <View style={newsStyles.postWrap}>{renderedPosts}</View>
        </View>
      </ScrollView>
    </View>
  );
}
