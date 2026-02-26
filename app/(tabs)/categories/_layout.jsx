import { Stack } from "expo-router";

export default function CategoriesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: true, title: "Categories" }}
      />
      <Stack.Screen
        name="[slug]"
        options={({ route }) => ({
          headerShown: true,
          title: route.params?.slug?.toUpperCase() || "Category",
        })}
      />
    </Stack>
  );
}
