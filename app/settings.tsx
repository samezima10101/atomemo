import { Colors } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <Pressable
            accessibilityLabel="戻る"
            accessibilityRole="button"
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={30} color={Colors.black} />
          </Pressable>
          <Text style={styles.title}>設定</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.content,
            { paddingBottom: insets.bottom + 24 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Pressable
            accessibilityLabel="メニュー"
            accessibilityRole="button"
            style={styles.premiumCard}
          >
            <Ionicons name="sparkles-outline" size={29} color={Colors.themePink} />
            <Text style={styles.premiumLabel}>メニュー</Text>
            <Ionicons
              name="chevron-forward"
              size={25}
              color={Colors.grayDark}
            />
          </Pressable>

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.themeGreenDark,
  },
  headerSpacer: {
    width: 44,
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
