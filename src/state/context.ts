import { createContext } from "react";
import { Animation, ToolbarType } from "../types";

export const AnimationContext = createContext<Animation>({
  id: "test",
  name: "test",
  type: "image",
});
export const AnimationDispatchContext = createContext<any>(null);

export const ToolbarContext = createContext<ToolbarType>({
  currentTool: "base",
  status: "idle",
});

export const ToolbarDispatchContext = createContext<any>(null);
