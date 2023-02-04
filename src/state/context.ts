import { createContext, Dispatch } from "react";
import {
  AnimationState,
  ToolbarState,
  AnimationEditorAction,
  ToolbarAction,
  AnimationMenuAction,
  AnimationStateDB,
} from "../types";

// Initial States

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
export const AnimationMenuContext = createContext<AnimationStateDB[] | null>(null);
export const AnimationMenuDispatchContext =
  createContext<Dispatch<AnimationMenuAction> | null>(null);

// Animation Editor Context
export const AnimationEditorContext = createContext<AnimationState | null>(null);
export const AnimationEditorDispatchContext =
  createContext<Dispatch<AnimationEditorAction> | null>(null);

export const ToolbarContext = createContext<ToolbarState | null>(null);
export const ToolbarDispatchContext = createContext<Dispatch<ToolbarAction> | null>(null);
