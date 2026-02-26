import { useRouter } from "expo-router";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

/**
 * BlogCard Component — adapted for dummyjson.com/posts
 *
 * Post shape from API:
 * {
 *   id: number,
 *   title: string,
 *   body: string,
 *   tags: string[],
 *   reactions: { likes: number, dislikes: number },
 *   views: number,
 *   userId: number,
 * }
 *
 * Props:
 *  - post        {Object}   required — post object from API
 *  - variant     {string}   "default" | "featured" | "compact"
 *  - onBookmark  {Function} optional
 *  - isBookmarked {boolean} optional
 */

// Tag pill — uses first tag as the "category"
const TagBadge = ({ tag }) => {
  const palettes = [
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-orange-100 text-orange-700",
    "bg-purple-100 text-purple-700",
    "bg-rose-100 text-rose-700",
    "bg-yellow-100 text-yellow-700",
  ];
  // pick a consistent color per tag string
  const index =
    tag?.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) %
    palettes.length;
  const [bg, text] = palettes[index ?? 0].split(" ");

  return (
    <View className={`px-2 py-0.5 rounded-full ${bg}`}>
      <Text className={`text-xs font-semibold capitalize ${text}`}>{tag}</Text>
    </View>
  );
};

// Reactions row — likes / dislikes / views
const ReactionsRow = ({ reactions, views }) => (
  <View className="flex-row items-center gap-3">
    <Text className="text-xs text-gray-400">👍 {reactions?.likes ?? 0}</Text>
    <Text className="text-xs text-gray-400">👎 {reactions?.dislikes ?? 0}</Text>
    <Text className="text-xs text-gray-400">👁 {views ?? 0}</Text>
  </View>
);

// ─── Avatar placeholder (no real image in dummyjson posts) ───────────────────
const UserAvatar = ({ userId, size = "sm" }) => {
  const sizeClass = size === "sm" ? "w-7 h-7" : "w-9 h-9";
  const textClass = size === "sm" ? "text-xs" : "text-sm";
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-rose-500",
  ];
  const color = colors[userId % colors.length];

  return (
    <View
      className={`${sizeClass} rounded-full ${color} items-center justify-center`}
    >
      <Text className={`text-white font-bold ${textClass}`}>U{userId}</Text>
    </View>
  );
};

// ─── Default Card ─────────────────────────────────────────────────────────────
const DefaultCard = ({
  post,
  onBookmark,
  isBookmarked,
  onPress,
  onTagPress,
}) => (
  <Pressable
    onPress={onPress}
    className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:opacity-75"
  >
    {/* Tags row */}
    <View className="flex-row flex-wrap gap-1 mb-3">
      {post.tags?.slice(0, 3).map((tag) => (
        <TouchableOpacity key={tag} onPress={() => onTagPress(tag)}>
          <TagBadge key={tag} tag={tag} />
        </TouchableOpacity>
      ))}
    </View>

    {/* Title */}
    <Text
      className="text-base font-bold text-gray-900 leading-snug mb-2"
      numberOfLines={2}
    >
      {post.title}
    </Text>

    {/* Body excerpt */}
    <Text className="text-sm text-gray-500 leading-5 mb-4" numberOfLines={3}>
      {post.body}
    </Text>

    {/* Footer */}
    <View className="flex-row items-center justify-between">
      {/* Author */}
      <View className="flex-row items-center gap-2">
        <UserAvatar userId={post.userId} />
        <Text className="text-xs font-semibold text-gray-600">
          User #{post.userId}
        </Text>
      </View>

      <View className="flex-row items-center gap-3">
        <ReactionsRow reactions={post.reactions} views={post.views} />
        {onBookmark && (
          <TouchableOpacity
            onPress={() => onBookmark(post)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text className="text-lg">{isBookmarked ? "🔖" : "🏷️"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </Pressable>
);

// ─── Featured Card ────────────────────────────────────────────────────────────
const FeaturedCard = ({
  post,
  onBookmark,
  isBookmarked,
  onPress,
  onTagPress,
}) => (
  <Pressable
    onPress={onPress}
    className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-5 active:opacity-80"
    style={{ backgroundColor: "#2563eb" }}
  >
    {/* Top row */}
    <View className="flex-row items-center justify-between mb-4">
      <View className="flex-row gap-1">
        {post.tags?.slice(0, 2).map((tag) => (
          <TouchableOpacity key={tag} onPress={() => onTagPress(tag)}>
            <View key={tag} className="px-2 py-0.5 rounded-full bg-white/20">
              <Text className="text-xs font-semibold text-white capitalize">
                {tag}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {onBookmark && (
        <TouchableOpacity onPress={() => onBookmark(post)}>
          <Text className="text-xl">{isBookmarked ? "🔖" : "🏷️"}</Text>
        </TouchableOpacity>
      )}
    </View>

    {/* Title */}
    <Text
      className="text-xl font-bold text-white leading-tight mb-2"
      numberOfLines={3}
    >
      {post.title}
    </Text>

    {/* Excerpt */}
    <Text className="text-sm text-white/70 mb-5" numberOfLines={2}>
      {post.body}
    </Text>

    {/* Footer */}
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-2">
        <UserAvatar userId={post.userId} />
        <Text className="text-sm text-white font-medium">
          User #{post.userId}
        </Text>
      </View>
      <View className="flex-row gap-3">
        <Text className="text-xs text-white/70">
          👍 {post.reactions?.likes}
        </Text>
        <Text className="text-xs text-white/70">👁 {post.views}</Text>
      </View>
    </View>
  </Pressable>
);

// ─── Compact Card ─────────────────────────────────────────────────────────────
const CompactCard = ({
  post,
  onBookmark,
  isBookmarked,
  onPress,
  onTagPress,
}) => (
  <Pressable
    onPress={onPress}
    className="flex-row bg-white rounded-xl p-3 border border-gray-100 gap-3 active:opacity-75"
  >
    {/* Left color strip acting as visual identity */}
    <View className="w-1 rounded-full bg-blue-500" />

    {/* Content */}
    <View className="flex-1">
      {/* Tag */}
      {post.tags?.[0] && (
        <TouchableOpacity onPress={onTagPress}>
          <TagBadge tag={post.tags[0]} />
        </TouchableOpacity>
      )}

      <Text
        className="text-sm font-bold text-gray-900 mt-1 mb-1 leading-snug"
        numberOfLines={2}
      >
        {post.title}
      </Text>

      <View className="flex-row items-center justify-between">
        <ReactionsRow reactions={post.reactions} views={post.views} />
        {onBookmark && (
          <TouchableOpacity
            onPress={() => onBookmark(post)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Text className="text-sm">{isBookmarked ? "🔖" : "🏷️"}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  </Pressable>
);

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function BlogCard({
  post,
  variant = "default",
  onBookmark,
  isBookmarked = false,
}) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/${post.id}`);
  };

  const handleTagPress = (tag) => {
    router.push(`/categories/${tag}`);
  };

  if (variant === "featured") {
    return (
      <FeaturedCard
        post={post}
        onBookmark={onBookmark}
        isBookmarked={isBookmarked}
        onPress={handlePress}
        onTagPress={handleTagPress}
      />
    );
  }

  if (variant === "compact") {
    return (
      <CompactCard
        post={post}
        onBookmark={onBookmark}
        isBookmarked={isBookmarked}
        onPress={handlePress}
        onTagPress={handleTagPress}
      />
    );
  }

  return (
    <DefaultCard
      post={post}
      onBookmark={onBookmark}
      isBookmarked={isBookmarked}
      onPress={handlePress}
      onTagPress={handleTagPress}
    />
  );
}
