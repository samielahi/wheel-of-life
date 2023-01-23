import { createContext } from "react";
import { v4 as uuid } from "uuid";
import { Animation, Frame, ToolbarType, Asset } from "../types";

// Constants
const NUM_FRAMES = 16;
const PLACEHOLDER_ASSET = "https://placekitten.com/150/200";

// Test Animation frames and Assets
const frames = [];
const assets: Record<string, Asset> = {};

// Initialize frames and assets
for (let i = 0; i < NUM_FRAMES; i++) {
  const assetId = uuid();
  const asset: Asset = {
    id: assetId,
    data: PLACEHOLDER_ASSET,
    isSelected: false,
    assignedFrames: [],
  };
  const frame: Frame = { id: i, data: undefined };

  assets[assetId] = asset;
  frames.push(frame);
}

export const initialAnimationState: Animation = {
  id: "test",
  type: "image",
  frames: frames,
  assets: assets,
  selectedAssets: [],
};

export const AnimationContext = createContext<Animation>(initialAnimationState);
export const AnimationDispatchContext = createContext<any>(null);

export const ToolbarContext = createContext<ToolbarType>({
  currentTool: "select",
  status: "idle",
});

export const ToolbarDispatchContext = createContext<any>(null);
