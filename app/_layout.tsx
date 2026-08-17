import "../global.css";

import { Stack } from "expo-router";

export default function TaskLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="tasks/new" options={{ headerShown: false }} />
    </Stack>
  );
}
