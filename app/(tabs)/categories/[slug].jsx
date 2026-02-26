import { useLocalSearchParams } from "expo-router";
import PostsListing from "../../../components/PostsListing";

export default function SingleCategory() {
  const { slug: tag } = useLocalSearchParams();

  return <PostsListing tag={tag} />;
}
