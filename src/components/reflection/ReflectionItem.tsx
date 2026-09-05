import { AppIcon } from "@/src/components/common/AppIcon";
import { Colors } from "@/src/constants/theme";
import { updateTask } from "@/src/features/tasks/services/reflectionServices";
import type { Task } from "@/src/types/task";
import { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ReflectionItem({ task }: { task: Task }) {
  const [reflection, setReflection] = useState(task.reflection ?? "");
  const [isEditing, setIsEditing] = useState(false);
  const [reflectionInputHeight, setReflectionInputHeight] = useState(48);
  const lastTapAt = useRef(0);

  const handleNotePress = () => {
    const now = Date.now();
    if (now - lastTapAt.current < 300) {
      setIsEditing(true);
    }
    lastTapAt.current = now;
  };

  const saveReflection = async () => {
    setIsEditing(false);
    Keyboard.dismiss();
    const nextReflection = reflection.trim();
    setReflectionInputHeight(48);
    if (nextReflection === task.reflection) return;

    try {
      await updateTask(task.id, { reflection: nextReflection || null });
    } catch (error) {
      setReflection(task.reflection ?? "");
      Alert.alert(
        "保存できませんでした",
        error instanceof Error ? error.message : "メモの保存に失敗しました。",
      );
    }
  };

  const handleReflectionChange = (value: string) => {
    setReflection(value);
    const lineCount = value.split("\n").length;
    setReflectionInputHeight(Math.max(48, lineCount * 24 + 24));
  };

  return (
    <View style={styles.container}>
      <View style={styles.checkColumn}>
        <AppIcon name="check" size={30} style={{ tintColor: Colors.themePink }} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{task.title}</Text>
        {isEditing ? (
          <View
            style={[
              styles.commentInputBox,
              { height: Math.max(54, reflectionInputHeight + 6) },
            ]}
          >
            <TextInput
              autoFocus
              multiline
              value={reflection}
              onChangeText={handleReflectionChange}
              onSubmitEditing={saveReflection}
              style={[styles.commentInput, { height: reflectionInputHeight }]}
              selectionColor={Colors.themeDark}
              cursorColor={Colors.themeDark}
            />
            <TouchableOpacity
              accessibilityLabel="メモを確定"
              onPress={saveReflection}
              style={styles.commentButton}
            >
              <View style={styles.commentButtonInner}>
                <AppIcon
                  name="check"
                  size={38}
                  style={{ tintColor: Colors.themePinkDark }}
                />
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <Pressable style={styles.savedCommentBox} onPress={handleNotePress}>
            <Text style={styles.noteText}>{reflection}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", minHeight: 112 },
  checkColumn: { width: 40, paddingTop: 5 },
  content: { flex: 1, paddingBottom: 28 },
  title: {
    fontSize: 30, lineHeight: 38, color: Colors.black
  },
  commentInputBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 18,
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
  noteText: { fontSize: 18, lineHeight: 24, color: Colors.black },
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
});
