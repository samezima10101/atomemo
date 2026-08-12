import { View } from "react-native";
import TaskItem from "../../src/components/task/TaskItem";

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white p-20 ">
      <TaskItem title="犬の散歩" />
      <TaskItem
        title="開発"
        subtasks="  ・イラストレーターさん委託
  ・デザイナー資料
  ・要件定義書作成"
      />
    </View>
  );
}
