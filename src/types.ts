import { DBSchema } from "idb";

export interface Asset {
  // animation the image belongs to
  // A uuid for the uploaded image
  id: string;
  // Object URL for uploaded image
  data: Blob | File;
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

// Animation Menu
export type AnimationMenuState = AnimationStateDB[];

export type AnimationMenuAction =
  | { type: "REHYDRATE"; animations: AnimationStateDB[] }
  | { type: "NAME_CHANGE"; animationId: string; name: string }
  | { type: "NEW_ANIMATION"; animation: AnimationStateDB }
  | { type: "DELETE_ANIMATION"; animationId: string };

// Animation Editor

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
  filledFrames?: Set<number>;
  // Whether or not Animation is ready to be played or exported
  isBuilt?: boolean;
  lastBuildTime?: Date;
  thumbnail?: Blob | File;
}

export type AnimationEditorAction =
  | { type: "UPLOAD_ASSET"; asset: Asset }
  | { type: "DELETE_ASSETS" }
  | { type: "ASSIGN_IMAGE"; assetId: string; targetFrame: number }
  | { type: "DEASSIGN_IMAGE"; assetId: string; targetFrame: number }
  | { type: "DEASSIGN_ALL" }
  | { type: "AUTO_ASSIGN" }
  | { type: "SELECT_ASSET"; assetId: string; selectionId: number }
  | { type: "DESELECT_ASSET"; assetId: string }
  | { type: "DESELECT_ALL" }
  | { type: "REHYDRATE"; animation: AnimationState }
  | { type: "BUILD" };

// Toolbar

export type ToolbarStatus =
  | "idle"
  | "selecting"
  | "deleting"
  | "exporting"
  | "auto-assigning"
  | "clearing"
  | "getting-help"
  | "building";

export interface ToolbarState {
  currentTool?: "base";
  status?: ToolbarStatus;
}
export type ToolbarAction = { type: "STATUS_CHANGE"; newStatus: ToolbarStatus };

// IDB Schema

export interface AnimationStateDB extends AnimationState {
  build?: Blob | undefined;
}

export interface AnimationSchema extends DBSchema {
  animations: {
    key: string;
    // Name of animation
    value: AnimationStateDB;
    indexes: { "by-name": string };
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
