export type TutorialTarget =
  | "home.welcome"
  | "home.add"
  | "home.add-row"
  | "task.form"
  | "task.title"
  | "task.date"
  | "task.description"
  | "task.save"
  | "home.complete"
  | "home.reflection"
  | "home.saved"
  | "tabs.reflections"
  | "reflections.note"
  | "reflections.edit"
  | "tabs.day";

export type TutorialPlacement = "top" | "bottom" | "left" | "right";

export interface TutorialStep {
  id: string;
  target?: TutorialTarget;
  additionalTargets?: TutorialTarget[];
  title: string;
  description: string;
  placement?: TutorialPlacement;
  /** Show the Back/Next controls. Action steps wait for an app event instead. */
  controls?: boolean;
  back?: boolean;
}

export const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "ようこそ  あとめも  へ！",
    description: "タスクをこなしながら、気づきや振り返りを残していきましょう。",
  },
  {
    id: "add-task",
    target: "home.add",
    additionalTargets: ["home.add-row"],
    title: "タスクの追加",
    description: "＋ボタンからタスクの編集画面へ進みます。",
    placement: "top",
    controls: false,
  },
  {
    id: "write-task",
    target: "task.form",
    additionalTargets: ["task.save"],
    title: "タスクタイトルと内容を入力",
    description: "タイトルと内容を入力したら、完了ボタンを押してください。",
    placement: "bottom",
    controls: false,
  },
  {
    id: "complete-task",
    target: "home.complete",
    title: "タスクを完了",
    description: "タスクが完了したら、〇ボタンを押します。",
    placement: "bottom",
    controls: false,
  },
  {
    id: "write-reflection",
    target: "home.reflection",
    title: "振り返りを入力",
    description: "タスクを通して気づいたことを入力し、チェックボタンで保存します。",
    placement: "top",
    controls: false,
  },
  {
    id: "reflection-saved",
    target: "home.saved",
    title: "メモを見返す",
    description: "保存した振り返りは、あとからいつでも見返せます。",
    back: false,
  },
  {
    id: "open-reflections",
    target: "tabs.reflections",
    title: "振り返り画面へ移動する",
    description: "「振り返り」を押すと、メモを一覧で確認できます。",
    placement: "top",
    controls: false,
  },
  {
    id: "review-notes",
    target: "reflections.note",
    title: "メモを見返す",
    description: "メモを追加したタスクのみが、一覧で表示されます。",
    back: false,
  },
  {
    id: "edit-note",
    target: "reflections.note",
    additionalTargets: ["reflections.edit"],
    title: "メモを編集",
    description: "メモをダブルタップして編集し、チェックボタンで保存します。",
    placement: "bottom",
    controls: false,
  },
  {
    id: "return-day",
    target: "tabs.day",
    title: "Dayモードに戻る",
    description: "タップしてDayモードに戻りましょう。",
    placement: "top",
    controls: false,
  },
  {
    id: "finished",
    title: "お疲れ様でした！",
    description: "自由にタスクを追加してみましょう。",
    back: false,
  },
];
