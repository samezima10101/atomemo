import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 必要なプロパティの型定義
type TaskFormProps = {
  initialTitle?: string;
  initialDescription?: string;
  initialTargetDate?: string;
  isSubmitting: boolean;
  onSubmit: (data: {
    title: string;
    description: string;
    target_date: string;
  }) => void;
};

export const TaskForm = ({
  initialTitle = "",
  initialDescription = "",
  initialTargetDate = new Date().toISOString(), // 初期値は今日の日付
  isSubmitting,
  onSubmit,
}: TaskFormProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [targetDate, setTargetDate] = useState(initialTargetDate);

  const handleSubmit = () => {
    if (!title.trim()) return; // タイトルが空の場合は送信しない等のバリデーション
    onSubmit({ title, description, target_date: targetDate });
  };

  return (
    <>
      {/* タイトルエリア */}
      <View style={styles.titleSection}>
        <View style={styles.blueCircleIcon} />
        <TextInput
          placeholder="タイトルを入力"
          value={title}
          onChangeText={setTitle}
          style={styles.titleInput}
        />
      </View>

      {/* カード部分（背景グレー） */}
      <View style={styles.detailCard}>
        {/* 日付表示行 */}
        <View style={styles.detailRow}>
          <View style={styles.iconColumn}>
            <EvilIcons name="calendar" size={32} color="#0f172a" />
          </View>
          {/* 日付をタップ可能にし、ピッカーを表示 */}
          <TouchableOpacity style={styles.dateBadge}>
            <DateTimePicker
              value={new Date(targetDate)}
              mode="date"
              display="default"
            />
          </TouchableOpacity>
        </View>

        {/* 内容入力行 */}
        <View style={styles.detailRowTop}>
          <View style={styles.iconColumn}>
            <SimpleLineIcons name="note" size={24} color="#0f172a" />
          </View>
          <View style={styles.contentBox}>
            <TextInput
              placeholder="詳細な内容を入力"
              value={description}
              onChangeText={setDescription}
              multiline
              style={styles.contentInput}
            />
          </View>
        </View>
      </View>

      {/* 完了ボタンエリア */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.doneButtonText}>
            {isSubmitting ? "保存中..." : "完了"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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
  titleInput: {
    flex: 1,
    fontSize: 22,
    fontWeight: "600",
    color: "#0f172a", // ユーザーが入力した文字は濃く表示
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
  contentInput: {
    flex: 1,
    fontSize: 18,
    color: "#0f172a", // ユーザーが入力した文字は濃く表示
    textAlignVertical: "top", // Androidでテキストが中央揃えになるのを防ぐ
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
