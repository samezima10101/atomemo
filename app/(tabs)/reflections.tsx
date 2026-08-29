import { Colors } from "@/src/constants/theme";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>振り返り</Text>
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
});
