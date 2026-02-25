import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function SingleCategory() {
  const { tag } = useLocalSearchParams();

  return <Text>Single Category: {tag}</Text>;
}
