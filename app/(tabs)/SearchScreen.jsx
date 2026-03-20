import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PostsListing from "../../components/PostsListing";

export default function SearchScreen() {
  const [inputValue, setInputValue] = useState("");
  const [searchedKeyword, setSearchedKeyword] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchedKeyword(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 gap-4">
        <TextInput
          placeholder="Search"
          className="border border-gray-300 px-4 rounded-lg"
          value={inputValue}
          onChangeText={setInputValue}
        />
      </View>
      {inputValue.trim().length > 0 ? (
        <View className="mt-4">
          <Text className="text-xl font-bold text-gray-800 px-4">
            Showing results for "{searchedKeyword}"
          </Text>
          <PostsListing search={searchedKeyword} />
        </View>
      ) : (
        <View className="mt-4">
          <Text className="text-xl font-bold text-gray-800 px-4">
            Popular Posts
          </Text>
          <PostsListing />
        </View>
      )}
    </SafeAreaView>
  );
}
