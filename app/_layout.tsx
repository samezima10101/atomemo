import { AuthProvider } from "@/src/features/auth/AuthContext";
import { Stack } from "expo-router";
import "../global.css";

export default function TaskLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="tasks/new" />
      </Stack>
    </AuthProvider>
  );
}
