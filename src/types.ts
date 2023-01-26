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
}

export interface Frame {
  id: number;
  // This is either Object URL for an uploaded img or drawn img
  assetId?: string | undefined;
  animationId?: string;
}

export interface Animation {
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
    | "deselectAll"
    | "rehydrate";
  targetFrame?: number;
  // For name change
  newName?: string;
  // For frame image add/delete/ AND asset add/delete/select/deselect
  assetId?: string;
  assetIds?: string[];
  // Uploads
  uploadedAsset?: Asset;
  uploadedAssets?: Asset[];
  animationState?: Animation;
}

export interface WorkerAction {
  type:
    | "getFrame"
    | "getAllFrames"
    | "setFrame"
    | "deleteFrame"
    | "getAsset"
    | "getAllAssets"
    | "setAsset"
    | "deleteAsset";
  key?: string | (string | number)[];
  frame?: Frame;
  asset?: Asset;
  name?: string;
  animationId?: string;
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

export interface DbAnimation extends Animation {
  build?: Blob | undefined;
}

export interface AnimationSchema extends DBSchema {
  animations: {
    key: string;
    // Name of animation
    value: DbAnimation;
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
