import { DBSchema } from "idb";

export interface Asset {
  // animation the image belongs to
  // A uuid for the uploaded image
  id: string;
  // Object URL for uploaded image
  data: Blob;
  isSelected?: boolean;
  assignedFrames?: number[];
  animationId?: string;
  selectionId?: number;
}

export interface Frame {
  id: number;
  // This is either Object URL for an uploaded img or drawn img
  assetId?: string | undefined;
  animationId?: string;
}

// Animation

export interface AnimationState {
  // A uuid
  id: string;
  // User defined name, defaults to id
  name?: string;
  // All 16 frames
  frames?: Frame[];
  // Object of Object URL strings for user uploaded images
  assets?: Record<string, Asset>;
  // A stack for selected assets from library
  selectedAssets?: string[];
  // Whether or not Animation is ready to be played
  isBuilt?: boolean;
  lastBuildTime?: Date;
}

export type AnimationAction =
  | { type: "NAME_CHANGE"; name: string }
  | { type: "UPLOAD_ASSET"; asset: Asset }
  | { type: "DELETE_ASSETS" }
  | { type: "ASSIGN_IMAGE"; assetId: string; targetFrame: number }
  | { type: "DEASSIGN_IMAGE"; assetId: string; targetFrame: number }
  | { type: "SELECT_ASSET"; assetId: string; selectionId: number }
  | { type: "DESELECT_ASSET"; assetId: string }
  | { type: "DESELECT_ALL" }
  | { type: "REHYDRATE"; animation: AnimationState };

export type AnimationDispatch = (action: AnimationAction) => void;

// Toolbar

type ToolbarStatus = "idle" | "selecting" | "deleting" | "exporting" | "getting-help";

export interface ToolbarState {
  currentTool?: "base";
  status?: "idle" | "selecting" | "deleting" | "exporting" | "getting-help";
  message?: string;
}
export type ToolbarAction =
  | { type: "STATUS_CHANGE"; newStatus: ToolbarStatus }
  | { type: "MESSAGE"; message: string };

export type ToolbarDispatch = (action: ToolbarAction) => void;

// IDB Schema
export interface AnimationStateDB extends AnimationState {
  build?: Blob | undefined;
}

export interface AnimationSchema extends DBSchema {
  animations: {
    key: string;
    // Name of animation
    value: AnimationStateDB;
  };

  assets: {
    key: string;
    value: Asset;
    indexes: { "by-animationId": string };
  };

  frames: {
    key: string;
    value: Frame;
    indexes: { "by-animationId": string };
  };
}
