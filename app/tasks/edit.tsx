import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/src/constants/theme";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>あとメモ</Text>
      <TouchableOpacity
        onPress={() => router.replace("/")}
        style={styles.backButton}
      >
        <Text style={[styles.backText]}>＜ 戻る</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 24,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "700",
  },
  backButton: {
    marginTop: 20,
  },
  backText: {
    fontSize: 16,
  },
});
