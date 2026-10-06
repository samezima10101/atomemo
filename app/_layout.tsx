import { AuthProvider } from "@/src/features/auth/AuthContext";
import { Stack } from "expo-router";
import { TutorialProvider } from "@/src/tutorial/TutorialProvider";
import { TutorialOverlay } from "@/src/tutorial/TutorialOverlay";
import { View } from "react-native";
import "../global.css";

export default function TaskLayout() {
  return (
    <AuthProvider>
      <TutorialProvider>
       <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="tasks/new" />
      </Stack>
      <TutorialOverlay />
       </View>
      </TutorialProvider>
    </AuthProvider>
  );
}
