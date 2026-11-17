import { AppIcon } from "@/src/components/common/AppIcon";
import { Colors } from "@/src/constants/theme";
import {
  TutorialTargetView,
  useTutorial,
} from "@/src/tutorial/TutorialProvider";
import { router, Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SlidingTabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]>
>[0];

function SlidingTabBar({
  state,
  emitter,
  navigateToTab,
}: SlidingTabBarProps) {
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const insets = useSafeAreaInsets();
  const { goTo, stepIndex, registerUndo } = useTutorial();

  useEffect(() => {
    registerUndo("open-reflections", () => router.navigate("/"));
    registerUndo("return-day", () => router.navigate("/reflections"));
    return () => {
      registerUndo("open-reflections");
      registerUndo("return-day");
    };
  }, [registerUndo]);
  // 0 = Dayモード, 1 = 振り返り, 2 = 設定
  const [animation] = useState(() => new Animated.Value(state.index));

  // 別タブが選択されたときにアニメーションを実行する
  useEffect(() => {
    Animated.timing(animation, {
      toValue: state.index,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [state.index, animation]);

  const activeTabWidth = tabBarWidth / state.routes.length;
  const activeTabTravelDistance = tabBarWidth - activeTabWidth;

  // アニメーションのタブ番号を画面上の横位置に設定
  const translateX = animation.interpolate({
    inputRange: [0, state.routes.length - 1],
    outputRange: [0, activeTabTravelDistance],
  });

  return (
    <View
      style={[
        styles.tabBarWrapper,
        { paddingBottom: Math.max(insets.bottom, 15) },
      ]}
    >
      <View style={styles.tabBarShadow}>
        <View
          style={styles.tabBar}
          onLayout={(event) => {
            setTabBarWidth(event.nativeEvent.layout.width);
          }}
        >
          {/* 選択中タブの白背景 */}
          {tabBarWidth > 0 && (
            <Animated.View
              style={[
                styles.activeTab,
                {
                  width: activeTabWidth,
                  transform: [{ translateX }],
                },
              ]}
            />
          )}

          {/* タブ本体 */}
          {state.routes.map((route, index) => {
            const isFocused = state.index === index;

            const onPress = () => {
              const event = emitter.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigateToTab(route.key);
              }
              if (route.name === "reflections" && stepIndex === 6)
                goTo("review-notes");
              if (route.name === "index" && stepIndex === 9) goTo("finished");
            };

            const tabButton = (
              <Pressable
                accessibilityLabel={
                  route.name === "index"
                    ? "Dayモード"
                    : route.name === "reflections"
                      ? "振り返り"
                      : "設定"
                }
                accessibilityRole="button"
                onPress={onPress}
                style={styles.tabButton}
              >
                {route.name === "index" ? (
                  <AppIcon
                    name="tabList"
                    size={30}
                    style={{ tintColor: Colors.black }}
                  />
                ) : route.name === "reflections" ? (
                  <AppIcon
                    name="tabMemo"
                    size={30}
                    style={{ tintColor: Colors.black }}
                  />
                ) : (
                  <AppIcon
                    name="settings-outline"
                    size={30}
                    style={{ tintColor: Colors.black }}
                  />
                )}
              </Pressable>
            );

            if (route.name === "setting") {
              return (
                <View key={route.key} style={styles.tabTarget}>
                  {tabButton}
                </View>
              );
            }

            return (
              <TutorialTargetView
                key={route.key}
                id={route.name === "index" ? "tabs.day" : "tabs.reflections"}
                style={styles.tabTarget}
              >
                {tabButton}
              </TutorialTargetView>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.layout}>
      <Tabs
        tabBar={(props) => <SlidingTabBar {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          sceneStyle: {
            backgroundColor: Colors.white,
            paddingTop: insets.top + 20,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Dayモード",
          }}
        />

        <Tabs.Screen
          name="reflections"
          options={{
            title: "振り返り",
          }}
        />

        <Tabs.Screen
          name="setting"
          options={{
            title: "設定",
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  tabBarWrapper: {
    paddingHorizontal: 15,
    marginBottom: 18,
    backgroundColor: Colors.white,
  },

  tabBarShadow: {
    borderRadius: 33,
    backgroundColor: Colors.themeLight,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
  },

  tabBar: {
    height: 66,
    flexDirection: "row",
    backgroundColor: Colors.themeGreen,
    borderRadius: 33,
    overflow: "hidden",
  },

  activeTab: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,

    backgroundColor: Colors.white,
    borderRadius: 33,
  },

  tabButton: {
    flex: 1,
    height: "100%",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    gap: 10,
  },
  tabTarget: { flex: 1 },

});
