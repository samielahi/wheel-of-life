import { createContext, Dispatch } from "react";
import {
  AnimationState,
  ToolsState,
  AnimationEditorAction,
  ToolsAction,
  AnimationMenuAction,
  AnimationMenuState,
} from "../types";

// Initial States
export const initialToolsState: ToolsState = { currentTool: "base", status: "idle" };

export const initialAnimationState: AnimationState = {
  id: "",
  name: "Untitled",
  thumbnail: undefined,
  assets: {},
  frames: [],
  selectedAssets: [],
  filledFrames: new Set<number>(),
  isBuilt: false,
  lastBuildTime: undefined,
};

// Animation Menu Context
export const AnimationMenuContext = createContext<AnimationMenuState | null>(null);
export const AnimationMenuDispatchContext =
  createContext<Dispatch<AnimationMenuAction> | null>(null);

// Animation Editor Context
export const AnimationEditorContext = createContext<AnimationState | null>(null);
export const AnimationEditorDispatchContext =
  createContext<Dispatch<AnimationEditorAction> | null>(null);

export const ToolsContext = createContext<ToolsState | null>(null);
export const ToolsDispatchContext = createContext<Dispatch<ToolsAction> | null>(null);
