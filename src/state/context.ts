import { createContext } from "react";
import { AnimationState, ToolbarState } from "../types";

export const AnimationEditorContext = createContext<AnimationState | null>(null);
export const AnimationEditorDispatchContext = createContext<any>(null);

export const ToolbarContext = createContext<ToolbarState>({
  currentTool: "base",
  status: "idle",
});

export const ToolbarDispatchContext = createContext<any>(null);
