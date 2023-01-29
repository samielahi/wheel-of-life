import { createContext } from "react";
import { AnimationState, ToolbarState } from "../types";

export const AnimationContext = createContext<AnimationState>({
  id: "test",
  name: "test",
});
export const AnimationDispatchContext = createContext<any>(null);

export const ToolbarContext = createContext<ToolbarState>({
  currentTool: "base",
  status: "idle",
});

export const ToolbarDispatchContext = createContext<any>(null);
