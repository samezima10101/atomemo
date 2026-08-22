import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { router, Stack } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EditScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View style={styles.container}>
        {/* ヘッダーエリア */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <AntDesign name="left" size={18} color="#0f172a" />
            <Text style={styles.backText}>戻る</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={26}
              color="#ef4444"
            />
          </TouchableOpacity>
        </View>

        {/* タイトルエリア */}
        <View style={styles.titleSection}>
          <View style={styles.blueCircleIcon} />
          <Text style={styles.titleText}>タイトル</Text>
        </View>

        {/* カード部分（背景グレー） */}
        <View style={styles.detailCard}>
          {/* 日付表示行 */}
          <View style={styles.detailRow}>
            <View style={styles.iconColumn}>
              <EvilIcons name="calendar" size={32} color="#0f172a" />
            </View>
            <View style={styles.dateBadge}>
              <Text style={styles.dateText}>8月29日</Text>
            </View>
          </View>

          {/* 内容表示行 */}
          <View style={styles.detailRowTop}>
            <View style={styles.iconColumn}>
              <SimpleLineIcons name="note" size={24} color="#0f172a" />
            </View>
            <View style={styles.contentBox}>
              <Text style={styles.contentText}>内容</Text>
            </View>
          </View>
        </View>

        {/* 完了ボタンエリア */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.doneButton}>
            <Text style={styles.doneButtonText}>完了</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 54,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    gap: 6,
    // iOS shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // Android elevation
    elevation: 3,
  },
  backText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a",
  },
  deleteButton: {
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 999,
    // iOS shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    // Android elevation
    elevation: 3,
  },
  titleSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 8,
    gap: 16,
  },
  blueCircleIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 3,
    borderColor: "#3b82f6",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#64748b",
  },
  detailCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    padding: 16,
    gap: 16,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailRowTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconColumn: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
    paddingTop: 4,
  },
  dateBadge: {
    backgroundColor: "#e2e8f0",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#3b82f6",
  },
  contentBox: {
    flex: 1,
    backgroundColor: "#e2e8f0",
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
  },
  contentText: {
    fontSize: 18,
    color: "#94a3b8",
  },
  footer: {
    position: "absolute",
    bottom: 36,
    right: 20,
  },
  doneButton: {
    backgroundColor: "#dbeafe",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 999,
  },
  doneButtonText: {
    fontSize: 22,
    fontWeight: "500",
    color: "#3b82f6",
  },
});
