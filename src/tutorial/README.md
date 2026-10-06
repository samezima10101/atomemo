# チュートリアル

`TutorialProvider` と `TutorialOverlay` は `app/_layout.tsx` でアプリ全体を囲む形で設定済みです。案内したいビューは `TutorialTargetView` にIDを付けて囲み、画面イベントから `useTutorial().goTo("step-id")` を呼ぶと次の画面にまたがる案内へ移動できます。

```tsx
const { goTo } = useTutorial();

<TutorialTargetView id="home.add">
  <TouchableOpacity
    onPress={() => {
      goTo("write-task");
      router.push("/tasks/edit");
    }}
  >
    <Text>タスクを追加</Text>
  </TouchableOpacity>
</TutorialTargetView>
```

ステップのタイトルや説明、ハイライト先は `tutorialSteps.ts` の配列で管理します。完了とスキップは AsyncStorage に保存され、本番では再表示しません。開発中 (`__DEV__`) は保存状態を無視して毎回最初から表示します。
