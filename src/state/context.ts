import { createContext } from "react";
import { v4 as uuid } from "uuid";
import { Animation, Frame, ToolbarType, Asset } from "../types";

// Constants
const NUM_FRAMES = 16;
const PLACEHOLDER_ASSET = "https://placekitten.com/150/200";
const PLACEHOLDER_FRAME_ASSET = "https://placekitten.com/300/400";

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

  assets[assetId] = asset;
  asset.data = PLACEHOLDER_FRAME_ASSET;

  const frame: Frame = { id: i, data: undefined };

  frames.push(frame);
}

export const initialAnimationState: Animation = {
  id: "test",
  type: "image",
  frames: frames,
  assets: {},
  selectedAssets: [],
};

export const AnimationContext = createContext<Animation>(initialAnimationState);
export const AnimationDispatchContext = createContext<any>(null);

export const ToolbarContext = createContext<ToolbarType>({
  currentTool: "base",
  status: "idle",
});

export const ToolbarDispatchContext = createContext<any>(null);
