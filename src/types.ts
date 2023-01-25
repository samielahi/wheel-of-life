import { DBSchema } from "idb";

export interface Asset {
  // animation the image belongs to
  // A uuid for the uploaded image
  id: string;
  // Object URL for uploaded image
  data: string;
  isSelected?: boolean;
  assignedFrames?: number[];
  animationId?: string;
}

export interface Frame {
  id: number;
  // This is either Object URL for an uploaded img or drawn img
  data: Asset | undefined;
  animationId?: string;
}

export interface Animation {
  // A uuid
  id: string;
  type: "image" | "drawn";
  // User defined name, defaults to something
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

// We'll just use one interface for all the actions for simplicity
export interface AnimationAction {
  type:
    | "nameChange"
    | "assignImage"
    | "deassignImage"
    | "uploadAsset"
    | "deleteAsset"
    | "deleteAssets"
    | "selectAsset"
    | "deselectAsset"
    | "deselectAll";
  targetFrame?: number;
  // For name change
  newName?: string;
  // For frame image add/delete/ AND asset add/delete/select/deselect
  assetId?: string;
  assetIds?: string[];
  // Uploads
  uploadedAsset?: Asset;
  uploadedAssets?: Asset[];
}

export type AnimationDispatch = (action: AnimationAction) => void;

export interface ToolbarType {
  currentTool?: "base";
  status?: "idle" | "selecting";
  message?: string;
}

export interface ToolbarAction {
  type: "startSelection" | "endSelection" | "message";
  message?: string;
}

export type ToolbarDispatch = (action: ToolbarAction) => void;

// For indexedDB

export interface AnimationSchema extends DBSchema {
  animation: {
    key: string;
    // Name of animation
    value: { id: string; name: string };
  };

  assets: {
    key: string;
    value: Asset;
    indexes: { "by-animationId": string };
  };

  frames: {
    key: string;
    value: Frame;
    indexes: { "by-animationId": string; "by-frameId": number };
  };
}
