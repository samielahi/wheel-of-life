export interface Asset {
  // A uuid for the uploaded image
  id: string;
  // Object URL for uploaded image
  data: string;
  isSelected?: boolean;
  assignedFrames?: number[];
}

export interface Frame {
  id: number;
  // This is either Object URL for an uploaded img or drawn img
  data: Asset | undefined;
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
    | "uploadAssets"
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
  status?: "idle" | "selecting" | "assigning";
  message?: string;
}

export interface ToolbarAction {
  type:
    | "startSelection"
    | "endSelection"
    | "startAssignment"
    | "endAssignment"
    | "tooltip";
  message?: string;
}

export type ToolbarDispatch = (action: ToolbarAction) => void;
