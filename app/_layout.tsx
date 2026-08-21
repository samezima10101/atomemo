import "../global.css";

import { Stack } from "expo-router";

export default function TaskLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="tasks/new" />
    </Stack>
  );
}
