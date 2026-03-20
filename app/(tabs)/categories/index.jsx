import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { usePostsByTag, useTags } from "../../../hooks/useBlogs";

export default function CategoryScreen() {
  const { data: tags, isLoading, error } = useTags();
  const {
    data: postsByTag,
    isLoading: loadingByTag,
    error: errorByTag,
  } = usePostsByTag(tags?.[0]?.slug);
  const [tag, setTag] = useState(tags?.[0]?.slug);

  useEffect(() => {
    if (tags && tags.length > 0) {
      setTag(tags[0].slug);
      // Optionally, you can prefetch posts for the first tag here
    }
  }, [tags]);

  const handleTagPress = (slug) => {
    // Navigate to a screen that shows posts for this tag
    router.push(`/categories/${slug}`);
  };

  if (isLoading && loadingByTag) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error && errorByTag) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-lg text-red-500">{error.message}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tags}
      keyExtractor={(item) => item.slug}
      contentContainerClassName="p-4 gap-4"
      renderItem={({ item }) => (
        <Pressable onPress={() => handleTagPress(item.slug)}>
          <View className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
            <Text className="text-xl font-bold">{item.name}</Text>
            <Text className="text-sm text-gray-500 mt-1">{tag} posts</Text>
            {/* You can add a horizontal scroll of posts for this tag here */}
          </View>
        </Pressable>
      )}
    />
  );
}
