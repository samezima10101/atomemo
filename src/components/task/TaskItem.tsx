import {
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";

type TaskProps = {
  title: string;
  subtasks?: string;
  taskStyle: StyleProp<ViewStyle>;
  titleStyle: StyleProp<TextStyle>;
  subtasksStyle: StyleProp<TextStyle>;
};

function Task({
  /*タスク1つ辺りの型指定*/
  title,
  subtasks,
  taskStyle,
  titleStyle,
  subtasksStyle,
}: TaskProps) {
  return (
    <View style={taskStyle}>
      <Text style={titleStyle}>{title}</Text>

      {subtasks && <Text style={subtasksStyle}>{subtasks}</Text>}
    </View>
  );
}

type TaskItemProps = {
  /*外側のタスク型*/
  taskStyle: StyleProp<ViewStyle>;
  titleStyle: StyleProp<TextStyle>;
  subtasksStyle: StyleProp<TextStyle>;
};

export default function TaskItem({
  taskStyle,
  titleStyle,
  subtasksStyle,
}: TaskItemProps) {
  return (
    <View>
      <Task
        title="犬の散歩"
        taskStyle={taskStyle}
        titleStyle={titleStyle}
        subtasksStyle={subtasksStyle}
      />

      <Task
        title="開発"
        subtasks={` ・イラストレーターさん委託
 ・デザイナー資料
 ・要件定義書作成`}
        taskStyle={taskStyle}
        titleStyle={titleStyle}
        subtasksStyle={subtasksStyle}
      />
    </View>
  );
}
