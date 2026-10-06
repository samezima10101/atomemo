import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { LayoutChangeEvent, View } from "react-native";
import { View as NativeView } from "react-native";
import { tutorialSteps, type TutorialTarget } from "./tutorialSteps";

const STORAGE_KEY = "atomemo:tutorial:completed:v1";

type TargetRect = { x: number; y: number; width: number; height: number };
type TutorialContextValue = {
  stepIndex: number;
  active: boolean;
  ready: boolean;
  rects: TargetRect[];
  registerTarget: (id: TutorialTarget, node: View | null) => void;
  refreshTarget: () => void;
  next: () => void;
  previous: () => void;
  skip: () => void;
  finish: () => void;
  goTo: (stepId: string) => void;
  registerUndo: (stepId: string, undo?: () => void | Promise<void>) => void;
};

const TutorialContext = createContext<TutorialContextValue | null>(null);

export function TutorialProvider({ children }: React.PropsWithChildren) {
  const [stepIndex, setStepIndex] = useState(0);
  const [ready, setReady] = useState(false);
  const [rects, setRects] = useState<TargetRect[]>([]);
  const targets = useRef(new Map<TutorialTarget, View>());
  const undoActions = useRef(new Map<string, () => void | Promise<void>>());

  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((completed) => {
        if (mounted && !__DEV__ && completed === "true") setStepIndex(-1);
      })
      .catch(() => undefined)
      .finally(() => mounted && setReady(true));
    return () => { mounted = false; };
  }, []);

  const refreshTarget = useCallback(() => {
    const step = tutorialSteps[stepIndex];
    const ids = [step?.target, ...(step?.additionalTargets ?? [])].filter((id): id is TutorialTarget => Boolean(id));
    if (ids.length === 0) { setRects([]); return; }
    requestAnimationFrame(() => {
      void Promise.all(ids.map((id) => new Promise<TargetRect | null>((resolve) => {
        const node = targets.current.get(id);
        if (!node) { resolve(null); return; }
        node.measureInWindow((x, y, width, height) => resolve(width > 0 && height > 0 ? { x, y, width, height } : null));
      }))).then((measured) => {
        const validRects = measured.filter((item): item is TargetRect => item !== null);
        setRects(validRects);
      });
    });
  }, [stepIndex]);

  useEffect(() => {
    const timer = setTimeout(refreshTarget, 100);
    return () => clearTimeout(timer);
  }, [refreshTarget]);

  const registerTarget = useCallback((id: TutorialTarget, node: View | null) => {
    if (node) targets.current.set(id, node);
    else targets.current.delete(id);
    const step = tutorialSteps[stepIndex];
    if (step?.target === id || step?.additionalTargets?.includes(id)) refreshTarget();
  }, [refreshTarget, stepIndex]);

  const finish = useCallback(() => {
    setStepIndex(-1);
    setRects([]);
    void AsyncStorage.setItem(STORAGE_KEY, "true").catch(() => undefined);
  }, []);

  const next = useCallback(() => {
    if (stepIndex >= tutorialSteps.length - 1) finish();
    else setStepIndex((index) => index + 1);
  }, [finish, stepIndex]);
  const registerUndo = useCallback((stepId: string, undo?: () => void | Promise<void>) => {
    if (undo) undoActions.current.set(stepId, undo);
    else undoActions.current.delete(stepId);
  }, []);
  const previous = useCallback(async () => {
    if (stepIndex <= 0) return;
    const previousStepId = tutorialSteps[stepIndex - 1]?.id;
    const undo = previousStepId ? undoActions.current.get(previousStepId) : undefined;
    try {
      await undo?.();
    } catch {
      return;
    }
    if (previousStepId) undoActions.current.delete(previousStepId);
    setRects([]);
    setStepIndex(stepIndex - 1);
  }, [stepIndex]);
  const skip = finish;
  const goTo = useCallback((stepId: string) => {
    if (stepIndex < 0) return;
    const index = tutorialSteps.findIndex((item) => item.id === stepId);
    if (index >= 0) setStepIndex(index);
  }, [stepIndex]);

  const value = useMemo(() => ({ stepIndex, active: ready && stepIndex >= 0, ready, rects, registerTarget, refreshTarget, next, previous, skip, finish, goTo, registerUndo }), [stepIndex, ready, rects, registerTarget, refreshTarget, next, previous, skip, finish, goTo, registerUndo]);
  return <TutorialContext.Provider value={value}>{children}</TutorialContext.Provider>;
}

export function useTutorial() {
  const context = useContext(TutorialContext);
  if (!context) throw new Error("useTutorial must be used inside TutorialProvider");
  return context;
}

/** Register a native view as the current step's spotlight target. */
export function useTutorialTarget(id: TutorialTarget) {
  const { registerTarget, refreshTarget } = useTutorial();
  const ref = useCallback((node: View | null) => registerTarget(id, node), [id, registerTarget]);
  const onLayout = useCallback((_event: LayoutChangeEvent) => refreshTarget(), [refreshTarget]);
  return { ref, onLayout };
}

export function TutorialTargetView({ id, children, style, enabled = true }: React.PropsWithChildren<{ id: TutorialTarget; style?: import("react-native").StyleProp<import("react-native").ViewStyle>; enabled?: boolean }>) {
  const { ref, onLayout } = useTutorialTarget(id);
  return <NativeView ref={enabled ? ref : undefined} onLayout={enabled ? onLayout : undefined} collapsable={false} style={style}>{children}</NativeView>;
}
