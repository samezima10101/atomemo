import ReflectionList from "@/src/components/reflection/ReflectionList";
import { Colors } from "@/src/constants/theme";
import { useAuth } from "@/src/features/auth/AuthContext";
import { useReflections } from "@/src/features/reflections/hooks/useReflections";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function HomeScreen() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const { tasks, isLoading, error, reload } = useReflections(user?.id);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );

  if (isAuthLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.themeMain} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>振り返り</Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.themeMain} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ReflectionList tasks={tasks} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 120,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
    color: Colors.black,
    marginBottom: 15,
    marginTop: 30,

  },
  errorText: {
    marginTop: 16,
    color: Colors.red,
  },
});
