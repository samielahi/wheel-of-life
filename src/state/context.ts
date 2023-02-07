import { createContext, Dispatch } from "react";
import {
  AnimationState,
  ToolbarState,
  AnimationEditorAction,
  ToolbarAction,
  AnimationMenuAction,
  AnimationMenuState,
} from "../types";

// Initial States
export const initialToolbarState: ToolbarState = { currentTool: "base", status: "idle" };

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
export const AnimationMenuDispatchContext = createContext<
  Dispatch<AnimationMenuAction> | any
>(null);

// Animation Editor Context
export const AnimationEditorContext = createContext<AnimationState | null>(null);
export const AnimationEditorDispatchContext =
  createContext<Dispatch<AnimationEditorAction> | null>(null);

export const ToolbarContext = createContext<ToolbarState | null>(null);
export const ToolbarDispatchContext = createContext<Dispatch<ToolbarAction> | null>(null);
