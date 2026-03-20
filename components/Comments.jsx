import { usePostComments } from "../hooks/useBlogs";

export default function Comments({ postId }) {
  const { data: comments, isLoading, error } = usePostComments(postId);

  if (isLoading) {
    return <Text>Loading comments...</Text>;
  }

  if (error) {
    return (
      <Text className="text-red-500">
        Error loading comments: {error.message}
      </Text>
    );
  }

  return (
    <View className="mt-4">
      <Text className="text-xl font-semibold mb-2">Comments</Text>
      {comments.length === 0 ? (
        <Text className="text-gray-500">No comments yet</Text>
      ) : (
        comments.map((comment) => (
          <View key={comment.id} className="mb-4">
            <Text className="text-gray-600">{comment.body}</Text>
          </View>
        ))
      )}
    </View>
  );
}
