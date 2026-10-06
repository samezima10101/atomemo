import { Colors } from "@/src/constants/theme";
import Svg, { Defs, Mask, Rect } from "react-native-svg";
import { useEffect, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTutorial } from "./TutorialProvider";
import { tutorialSteps } from "./tutorialSteps";

const PAD = 8;
const TOOLTIP_HEIGHT = 224;

function getOutsideRects(holes: { x: number; y: number; width: number; height: number }[], width: number, height: number) {
  const xs = [...new Set([0, width, ...holes.flatMap((hole) => [Math.max(0, Math.min(width, hole.x)), Math.max(0, Math.min(width, hole.x + hole.width))])])].sort((a, b) => a - b);
  const ys = [...new Set([0, height, ...holes.flatMap((hole) => [Math.max(0, Math.min(height, hole.y)), Math.max(0, Math.min(height, hole.y + hole.height))])])].sort((a, b) => a - b);
  const outside: { x: number; y: number; width: number; height: number }[] = [];
  for (let column = 0; column < xs.length - 1; column += 1) {
    for (let row = 0; row < ys.length - 1; row += 1) {
      const x = xs[column];
      const y = ys[row];
      const cellWidth = xs[column + 1] - x;
      const cellHeight = ys[row + 1] - y;
      const centerX = x + cellWidth / 2;
      const centerY = y + cellHeight / 2;
      const isSpotlighted = holes.some((hole) => centerX >= hole.x && centerX <= hole.x + hole.width && centerY >= hole.y && centerY <= hole.y + hole.height);
      if (cellWidth > 0 && cellHeight > 0 && !isSpotlighted) outside.push({ x, y, width: cellWidth, height: cellHeight });
    }
  }
  return outside;
}

export function TutorialOverlay() {
  const { active, stepIndex, rects, next, previous, skip, refreshTarget } = useTutorial();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [opacity] = useState(() => new Animated.Value(0));
  const [stepTransition] = useState(() => new Animated.Value(1));
  const step = tutorialSteps[stepIndex];

  useEffect(() => {
    Animated.timing(opacity, { toValue: active ? 1 : 0, duration: 220, useNativeDriver: true }).start();
  }, [active, opacity, stepIndex]);

  useEffect(() => {
    stepTransition.setValue(0);
    Animated.timing(stepTransition, { toValue: 1, duration: 180, useNativeDriver: true }).start();
  }, [stepIndex, stepTransition]);

  useEffect(() => {
    const timer = setInterval(refreshTarget, 500);
    return () => clearInterval(timer);
  }, [refreshTarget]);

  if (!active || !step) return null;

  const holes = rects.map((rect) => ({
    x: Math.max(0, rect.x - PAD), y: Math.max(0, rect.y - PAD),
    width: Math.min(width, rect.width + PAD * 2), height: rect.height + PAD * 2,
  }));
  const hole = holes[0] ?? null;
  const tooltipWidth = Math.min(width - 32, 340);
  const tooltipHeight = stepIndex === 0 ? TOOLTIP_HEIGHT + 56 : TOOLTIP_HEIGHT;
  const centerY = (insets.top + height - insets.bottom) / 2;
  let tooltipTop = centerY - tooltipHeight / 2;
  let tooltipLeft = (width - tooltipWidth) / 2;
  if (hole) {
    const placement = step.placement ?? (hole.y > height * 0.55 ? "top" : "bottom");
    const safeTop = insets.top + 8;
    const safeBottom = Math.max(safeTop, height - insets.bottom - tooltipHeight - 8);
    const clampTop = (top: number) => Math.max(safeTop, Math.min(safeBottom, top));
    const clampLeft = (left: number) => Math.max(16, Math.min(width - tooltipWidth - 16, left));
    const centeredLeft = clampLeft(hole.x + hole.width / 2 - tooltipWidth / 2);
    const above = { top: clampTop(hole.y - tooltipHeight - 14), left: centeredLeft };
    const below = { top: clampTop(hole.y + hole.height + 14), left: centeredLeft };
    const besideTop = clampTop(hole.y + hole.height / 2 - tooltipHeight / 2);
    const left = { top: besideTop, left: clampLeft(hole.x - tooltipWidth - 14) };
    const right = { top: besideTop, left: clampLeft(hole.x + hole.width + 14) };
    const preferred = placement === "top" ? above : placement === "bottom" ? below : placement === "left" ? left : right;
    const aroundEveryTarget = holes.flatMap((item) => [
      { top: clampTop(item.y + item.height + 14), left: (width - tooltipWidth) / 2 },
      { top: clampTop(item.y - tooltipHeight - 14), left: (width - tooltipWidth) / 2 },
    ]);
    const candidates = [preferred, ...aroundEveryTarget, below, above, left, right, { top: clampTop(centerY - tooltipHeight / 2), left: (width - tooltipWidth) / 2 }];
  const doesNotCoverSpotlight = (candidate: { top: number; left: number }) => holes.every((item) => candidate.left + tooltipWidth <= item.x || candidate.left >= item.x + item.width || candidate.top + tooltipHeight <= item.y || candidate.top >= item.y + item.height);
    const selected = candidates.find(doesNotCoverSpotlight) ?? candidates[0];
    tooltipTop = selected.top;
    tooltipLeft = selected.left;
  }
  const cardCoversSpotlight = holes.some((item) => tooltipLeft < item.x + item.width && tooltipLeft + tooltipWidth > item.x && tooltipTop < item.y + item.height && tooltipTop + tooltipHeight > item.y);
  const outsideRects = getOutsideRects(holes, width, height);

  return (
    <Animated.View pointerEvents="box-none" style={[StyleSheet.absoluteFill, styles.root, { opacity }]}>
      <Svg pointerEvents="none" width={width} height={height} style={StyleSheet.absoluteFill}>
        <Defs>
          <Mask id="spotlight" maskUnits="userSpaceOnUse" x="0" y="0" width={width} height={height}>
            <Rect width={width} height={height} fill="white" />
            {holes.map((item, index) => <Rect key={index} x={item.x} y={item.y} width={item.width} height={item.height} rx={16} fill="black" />)}
          </Mask>
        </Defs>
        <Rect width={width} height={height} fill="rgba(0,0,0,0.64)" mask="url(#spotlight)" />
        {holes.map((item, index) => <Rect key={index} x={item.x} y={item.y} width={item.width} height={item.height} rx={16} fill="none" stroke={Colors.themePink} strokeWidth={2} />)}
      </Svg>
      {outsideRects.map((rect, index) => <Pressable key={index} accessibilityRole="none" onPress={() => {}} style={[styles.blocker, { left: rect.x, top: rect.y, width: rect.width, height: rect.height }]} />)}
      <Animated.View pointerEvents={cardCoversSpotlight ? "box-none" : "auto"} style={[styles.card, { width: tooltipWidth, minHeight: tooltipHeight, top: tooltipTop, left: tooltipLeft, opacity: stepTransition, transform: [{ translateY: stepTransition.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }] }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.progress}>{stepIndex + 1} / {tutorialSteps.length}</Text>
        </View>
        <Text style={styles.title}>{step.title}</Text>
        <Text style={styles.description}>{step.description}</Text>
        {stepIndex === 0 && <Pressable accessibilityRole="button" onPress={skip} style={styles.skipButton}>
          <Text style={styles.skipText}>チュートリアルをスキップ</Text>
        </Pressable>}
        <View style={[styles.actions, stepIndex === 0 && styles.firstStepActions]}>
          {stepIndex !== 0 && <Pressable accessibilityRole="button" onPress={previous} style={styles.backButton}>
            <Text style={styles.backText}>戻る</Text>
          </Pressable>}
          {step.controls !== false && <Pressable accessibilityRole="button" onPress={next} style={styles.nextButton}>
            <Text style={styles.nextText}>{stepIndex === tutorialSteps.length - 1 ? "完了" : "次へ"}</Text>
          </Pressable>}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  root: { zIndex: 9999, elevation: 9999 },
  blocker: { position: "absolute" },
  card: { position: "absolute", minHeight: TOOLTIP_HEIGHT, borderRadius: 20, backgroundColor: Colors.white, padding: 20, shadowColor: Colors.black, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.22, shadowRadius: 18, elevation: 15 },
  cardHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  progress: { color: Colors.themePink, fontSize: 13, fontWeight: "700" },
  title: { color: Colors.black, fontSize: 20, fontWeight: "700", marginBottom: 10 },
  description: { color: Colors.grayDark, fontSize: 15, lineHeight: 23, flex: 1 },
  actions: { flexDirection: "row", justifyContent: "space-between", gap: 12, marginTop: 16 },
  firstStepActions: { justifyContent: "flex-end" },
  skipButton: { alignSelf: "center", paddingVertical: 8, paddingHorizontal: 16, marginTop: 8 },
  skipText: { color: Colors.grayDark, fontSize: 14, textDecorationLine: "underline" },
  backButton: { minWidth: 92, alignItems: "center", paddingVertical: 12, borderRadius: 999, backgroundColor: Colors.themeGreenLight },
  backText: { color: Colors.black, fontSize: 15, fontWeight: "600" },
  nextButton: { minWidth: 120, alignItems: "center", paddingVertical: 12, borderRadius: 999, backgroundColor: Colors.themePink },
  nextText: { color: Colors.white, fontSize: 15, fontWeight: "700" },
});
