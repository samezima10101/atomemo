import { Colors } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>設定</Text>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: insets.bottom + 24 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.premiumCard}>
            <Ionicons
              name="sparkles-outline"
              size={29}
              color={Colors.themePink}
            />
            <Text style={styles.premiumLabel}>メニュー</Text>
            <Ionicons
              name="chevron-forward"
              size={25}
              color={Colors.grayDark}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    minHeight: 56,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.themeGreenDark,
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  premiumCard: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    paddingHorizontal: 25,
    borderRadius: 30,
    backgroundColor: Colors.themeGreenLight,
  },
  premiumLabel: {
    flex: 1,
    fontSize: 21,
    color: Colors.black,
  },
});
