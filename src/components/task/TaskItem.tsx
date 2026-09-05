import { AppIcon } from "@/src/components/common/AppIcon";
import { Colors } from "@/src/constants/theme";
import type { Task } from "@/src/types/task";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type TaskItemProps = {
  task: Task;
  onCompletionChange?: (
    taskId: string,
    isCompleted: boolean,
    reflection: string | null,
  ) => Promise<void>;
};

export default function TaskItem({ task, onCompletionChange }: TaskItemProps) {
  const commentInputRef = useRef<TextInput>(null);
  const shouldFocusCommentRef = useRef(false);
  const [isCompleted, setIsCompleted] = useState(task.is_completed);
  const [comment, setComment] = useState(task.reflection ?? "");
  const [savedComment, setSavedComment] = useState(task.reflection ?? "");
  const [isCommentInputVisible, setIsCommentInputVisible] = useState(false);
  const [commentInputHeight, setCommentInputHeight] = useState(48);

  useEffect(() => {
    if (isCommentInputVisible && shouldFocusCommentRef.current) {
      shouldFocusCommentRef.current = false;
      commentInputRef.current?.focus();
    }
  }, [isCommentInputVisible]);

  // アイコンがタップされた時に状態を反転させる関数
  const toggleComplete = async () => {
    const nextCompleted = !isCompleted;
    if (!isCompleted) {
      shouldFocusCommentRef.current = true;
      setIsCommentInputVisible(true);
    } else {
      setIsCommentInputVisible(false);
    }
    setIsCompleted(nextCompleted);
    if (nextCompleted && !onCompletionChange) return;

    await onCompletionChange?.(task.id, nextCompleted, null);
  };

  const saveComment = async () => {
    const nextComment = comment.trim();
    Keyboard.dismiss();
    setSavedComment(nextComment);
    setComment("");
    setCommentInputHeight(48);
    setIsCommentInputVisible(false);
    await onCompletionChange?.(task.id, true, nextComment || null);
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
    const lineCount = value.split("\n").length;
    setCommentInputHeight(Math.max(48, lineCount * 24 + 24));
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <TouchableOpacity onPress={toggleComplete}>
          {isCompleted ? (
            <AppIcon
              name="check"
              size={32}
              style={{ tintColor: Colors.themePink }}
            />
          ) : (
            <View style={styles.uncheckCircle} />
          )}
        </TouchableOpacity>
        <View style={styles.verticalLine} />
      </View>

      <View style={styles.rightColumn}>
        <View style={styles.titleRow}>
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/tasks/edit",
                params: { taskId: task.id, targetDate: task.target_date },
              })
            }
          >
            <Text style={[styles.title, isCompleted && styles.completedTitle]}>
              {task.title}
            </Text>
          </TouchableOpacity>
        </View>

        {task.description && (
          <Text style={styles.subtasks}>{task.description}</Text>
        )}

        {isCompleted && isCommentInputVisible && (
          <View style={styles.commentRow}>
            <View
              style={[
                styles.commentInputBox,
                { height: Math.max(54, commentInputHeight + 6) },
              ]}
            >
              <TextInput
                ref={commentInputRef}
                value={comment}
                onChangeText={handleCommentChange}
                placeholder="振り返りを入力"
                placeholderTextColor={Colors.gray}
                style={[styles.commentInput, { height: commentInputHeight }]}
                multiline
                returnKeyType="done"
                onSubmitEditing={saveComment}
              />
              <TouchableOpacity
                accessibilityLabel="振り返りを確定"
                onPress={saveComment}
                style={styles.commentButton}
              >
                <View style={styles.commentButtonInner}>
                  <AppIcon
                    name="check"
                    size={38}
                    style={{ tintColor: Colors.themePink }}
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
    minHeight: 90,
  },
  leftColumn: {
    width: 60,
    alignItems: "flex-start",
  },
  uncheckCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.themePink,
  },
  verticalLine: {
    width: 3,
    backgroundColor: Colors.themePink,
    flexGrow: 1,
    marginTop: 8,
    marginBottom: 8,
  },
  rightColumn: {
    flex: 1,
    paddingBottom: 50,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: Colors.black,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: Colors.gray,
  },
  moreIcon: {
    marginLeft: 20,
  },
  subtasks: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: 30,
    color: Colors.grayDark,
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
    borderColor: Colors.themePink,
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
