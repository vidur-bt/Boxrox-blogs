import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { useTags } from "../../../hooks/useBlogs";

export default function CategoryScreen() {
  const { data: tags, isLoading, error } = useTags();

  const handleTagPress = (slug) => {
    // Navigate to a screen that shows posts for this tag
    router.push(`${slug}`);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error) {
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
          <View className="bg-gray-50 p-6 rounded-lg">
            <Text className="text-xl font-bold mb-2">{item.name}</Text>
            {/* You can add a horizontal scroll of posts for this tag here */}
          </View>
        </Pressable>
      )}
    />
  );
}
