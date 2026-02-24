import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { usePost } from "../../hooks/useBlogs";

export default function SinglePostScreen() {
  const { postId } = useLocalSearchParams();
  const { data: post, isLoading, error } = usePost(postId);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#000" />
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
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="text-2xl font-bold mb-2">{post.title}</Text>
      <Text className="text-base text-gray-800">{post.body}</Text>
    </ScrollView>
  );
}
