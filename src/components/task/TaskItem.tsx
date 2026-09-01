import { Colors } from "@/src/constants/theme";
import { MaterialIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export type TaskItemProps = {
  title: string;
  subtasks?: string;
  completed?: boolean;
  onToggle?: () => void;
};

export default function TaskItem({
  title,
  subtasks,
  completed = false,
  onToggle,
}: TaskItemProps) {
  return (
    <View style={styles.container}>
      {/* 左列：アイコン ＋ サブタスクの長さに追従する青い線 */}
      <View style={styles.iconColumn}>
        <TouchableOpacity
          onPress={onToggle}
          style={styles.checkButton}
          activeOpacity={0.7}
        >
          <AppIcon name={completed ? "check" : "circle"} size={36} />
        </TouchableOpacity>

        {/* 青い線のエリア：最小高さを設定してサブタスク無しでも棒を表示 */}
        <View style={styles.lineWrapper}>
          <View style={styles.blueLine} />
        </View>
      </View>

      {/* 右側のタスク内容部分 */}
      <View style={styles.rightColumn}>
        <View style={styles.titleRow}>
          <Text style={[styles.title, isCompleted && styles.completedTitle]}>
            {title}
          </Text>
        </View>

        {subtasks && <Text style={styles.subtasks}>{subtasks}</Text>}

        {isCompleted && isCommentInputVisible && (
          <View style={styles.commentRow}>
            <View
              style={[
                styles.commentInputBox,
                { height: Math.max(54, commentInputHeight + 6) },
              ]}
            >
              <TextInput
                value={comment}
                onChangeText={handleCommentChange}
                placeholder="コメントを入力"
                placeholderTextColor={Colors.gray}
                style={[styles.commentInput, { height: commentInputHeight }]}
                autoFocus
                multiline
                returnKeyType="done"
                onSubmitEditing={saveComment}
              />
              <TouchableOpacity
                accessibilityLabel="コメントを確定"
                onPress={saveComment}
                style={styles.commentButton}
              >
                <View style={styles.commentButtonInner}>
                  <MaterialIcons
                    name="check"
                    size={38}
                    color={Colors.themeMain}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {isCompleted && !isCommentInputVisible && savedComment && (
          <View style={styles.savedCommentBox}>
            <Text style={styles.savedComment}>{savedComment}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  iconColumn: {
    width: 48,
    alignItems: "center",
    alignSelf: "stretch",
  },
  verticalLine: {
    width: 3,
    backgroundColor: Colors.themeMain,
    flexGrow: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  lineWrapper: {
    flex: 1,
    minHeight: 20, // サブタスクが無くても最低20pxの棒を表示
    alignItems: "center",
    paddingTop: 6,
    paddingBottom: 4,
  },
  blueLine: {
    width: 2,
    height: "100%", // 親要素の高さに合わせて可変伸縮
    backgroundColor: "#3b82f6",
  },
  content: {
    flex: 1,
    paddingTop: 2,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0f172a",
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
  },
  subtasks: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: 30,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
  },
  commentInputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    borderWidth: 2,
    borderColor: Colors.themeMain,
    borderRadius: 7,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  commentInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 18,
    lineHeight: 24,
    color: Colors.black,
    textAlignVertical: "top",
  },
  commentButton: {
    alignSelf: "flex-start",
    width: 60,
    alignItems: "flex-end",
    justifyContent: "center",
    marginVertical: 3,
    marginRight: 4,
    backgroundColor: Colors.white,
    borderRadius: 26,
  },
  commentButtonInner: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.themeLight,
    borderRadius: 5,
  },
  savedCommentBox: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    minHeight: 54,
    justifyContent: "center",
    backgroundColor: Colors.themeLight,
    borderRadius: 7,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  savedComment: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.black,
  },
});
