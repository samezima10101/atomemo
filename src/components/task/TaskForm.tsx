import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  InputAccessoryView,
  Keyboard,
  Modal,
  Platform,
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
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const descriptionInputAccessoryId = "task-description-input-accessory";

  const handleSubmit = () => {
    if (!title.trim()) return; // タイトルが空の場合は送信しない等のバリデーション
    Keyboard.dismiss();
    onSubmit({ title, description, target_date: targetDate });
  };

  const handleDateChange = (_event: unknown, selectedDate?: Date) => {
    if (selectedDate) setTargetDate(selectedDate.toISOString());
    if (Platform.OS !== "ios") setIsDatePickerVisible(false);
  };

  const selectedDate = new Date(targetDate);
  const formattedTargetDate = `${selectedDate.getMonth() + 1}月${selectedDate.getDate()}日`;

  return (
    <>
      {/* タイトルエリア */}
      <View style={styles.titleSection}>
        <View style={styles.blueCircleIcon} />
        <TextInput
          placeholder="タイトルを入力"
          value={title}
          onChangeText={setTitle}
          caretHidden={false}
          selectionColor="#2563eb"
          cursorColor="#2563eb"
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
          {/* 日付をタップするとピッカーを表示 */}
          <TouchableOpacity
            style={styles.dateBadge}
            onPress={() => setIsDatePickerVisible(true)}
          >
            <Text style={styles.dateText}>{formattedTargetDate}</Text>
          </TouchableOpacity>
        </View>

        {/* 内容入力行 */}
        <View style={styles.detailRowTop}>
          <View style={styles.iconColumn}>
            <SimpleLineIcons name="note" size={24} color="#0f172a" />
          </View>
          <View style={styles.contentBox}>
            <TextInput
              placeholder="内容"
              value={description}
              onChangeText={setDescription}
              multiline
              submitBehavior="newline"
              caretHidden={false}
              selectionColor="#2563eb"
              cursorColor="#2563eb"
              inputAccessoryViewID={
                Platform.OS === "ios" ? descriptionInputAccessoryId : undefined
              }
              style={styles.contentInput}
            />
          </View>
        </View>
      </View>

      <Modal
        visible={isDatePickerVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDatePickerVisible(false)}
      >
        <View style={styles.dateModalBackdrop}>
          <View style={styles.dateModalCard}>
            <View style={styles.dateModalHeader}>
              <Text style={styles.dateModalTitle}>日付を選択</Text>
              <TouchableOpacity
                onPress={() => setIsDatePickerVisible(false)}
                style={styles.dateModalCloseButton}
              >
                <Text style={styles.dateModalCloseText}>閉じる</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={new Date(targetDate)}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "calendar"}
              locale="ja-JP"
              onChange={handleDateChange}
            />
          </View>
        </View>
      </Modal>

      {Platform.OS === "ios" && (
        <InputAccessoryView nativeID={descriptionInputAccessoryId}>
          <View style={styles.keyboardToolbar}>
            <TouchableOpacity
              onPress={Keyboard.dismiss}
              style={styles.keyboardDismissButton}
            >
              <Text style={styles.keyboardDismissText}>閉じる</Text>
            </TouchableOpacity>
          </View>
        </InputAccessoryView>
      )}

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
  dateModalBackdrop: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(15, 23, 42, 0.35)",
    padding: 20,
  },
  dateModalCard: {
    width: "100%",
    maxWidth: 360,
    borderRadius: 16,
    backgroundColor: "white",
    padding: 16,
  },
  dateModalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  dateModalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0f172a",
  },
  dateModalCloseButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  dateModalCloseText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2563eb",
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
  keyboardToolbar: {
    alignItems: "flex-end",
    backgroundColor: "#f8fafc",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#cbd5e1",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  keyboardDismissButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  keyboardDismissText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
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
