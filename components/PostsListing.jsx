import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useInfinitePosts } from "../hooks/useBlogs";
import useAppStore from "../store/useAppStore";
import BlogCard from "./BlogCard";

export default function PostsListing({ tag, search }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfinitePosts({ tag, search });

  const { bookmarks, addBookmark, removeBookmark } = useAppStore();

  // Flatten all pages into a single array
  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  const handleBookmark = (post) => {
    const already = bookmarks.some((b) => b.id === post.id);
    already ? removeBookmark(post.id) : addBookmark(post);
  };

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 px-6">
        <Text className="text-4xl mb-4">⚠️</Text>
        <Text className="text-lg font-bold text-gray-800 mb-1">
          Failed to load posts
        </Text>
        <Text className="text-sm text-gray-500 text-center mb-6">
          Check your internet connection and try again.
        </Text>
        <Text className="text-blue-600 font-semibold text-sm" onPress={refetch}>
          Retry
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      contentContainerClassName="p-4 gap-3"
      showsVerticalScrollIndicator={false}
      // Featured card for first post
      renderItem={({ item, index }) => (
        <BlogCard
          post={item}
          variant={index === 0 ? "featured" : "default"}
          onBookmark={handleBookmark}
          isBookmarked={bookmarks.some((b) => b.id === item.id)}
        />
      )}
      onEndReached={() => hasNextPage && fetchNextPage()}
      onEndReachedThreshold={0.5}
      refreshing={isLoading}
      onRefresh={refetch}
      ListFooterComponent={
        isFetchingNextPage ? (
          <ActivityIndicator className="my-12" color="#2563eb" />
        ) : null
      }
      ListEmptyComponent={
        <View className="items-center justify-center py-20">
          <Text className="text-gray-400 text-sm">No posts found</Text>
        </View>
      }
    />
  );
}
