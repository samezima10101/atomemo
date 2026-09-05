import { AppIcon } from "@/src/components/common/AppIcon";
import { Colors } from "@/src/constants/theme";
import { Tabs } from "expo-router";
import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type SlidingTabBarProps = Parameters<
  NonNullable<ComponentProps<typeof Tabs>["tabBar"]>
>[0];

function SlidingTabBar({ state, descriptors, navigation }: SlidingTabBarProps) {
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const insets = useSafeAreaInsets();

  // 0 = Dayモード
  // 1 = 振り返り
  const animation = useRef(new Animated.Value(state.index)).current;

  // 別タブが選択されたときにアニメーションを実行する
  useEffect(() => {
    Animated.timing(animation, {
      toValue: state.index,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [state.index, animation]);

  // 左45% : 共通の白い範囲10% : 右45%
  const activeTabWidth = tabBarWidth * 0.52;
  const activeTabTravelDistance = tabBarWidth * 0.48;

  // animationの0,1を画面上の横位置に設定
  const translateX = animation.interpolate({
    inputRange: [0, 1],
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
            const { options } = descriptors[route.key];

            const isFocused = state.index === index;

            const label =
              typeof options.tabBarLabel === "string"
                ? options.tabBarLabel
                : (options.title ?? route.name);

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <Pressable
                key={route.key}
                onPress={onPress}
                style={styles.tabButton}
              >
                {route.name === "index" ? (
                  <AppIcon name="tabList" size={30} style={{ tintColor: Colors.black }}/>
                ) : (
                  <AppIcon name="tabMemo" size={30} style={{ tintColor: Colors.black }}/>
                )}

                <Text style={styles.tabLabel}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <SlidingTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        sceneStyle: {
          backgroundColor: Colors.white,
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
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    paddingHorizontal: 15,
    paddingTop: 8,
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

  tabLabel: {
    fontSize: 18,
    color: Colors.black,
  },
});
