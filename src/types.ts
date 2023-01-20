export interface Asset {
  // A uuid for the uploaded image
  id: string;
  // Object URL for uploaded image
  data: string;
}

export interface Frame {
  id: number;
  // This is either Object URL for an uploaded img or drawn img
  data?: string;
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
  selectedAssets?: Asset[];
  // Whether or not Animation is ready to be played
  isBuilt?: boolean;
  lastBuildTime?: Date;
}

// We'll just use one interface for all the actions for simplicity
export interface AnimationAction {
  type:
    | "nameChange"
    | "imgAdd"
    | "imgDelete"
    | "uploadAsset"
    | "deleteAsset"
    | "selectAsset"
    | "deselectAsset"
    | "build";
  // For name change
  newName?: string;
  // For frame image add/delete/ AND asset add/delete/select/deselect
  assetIds?: string[];
  // Uploads
  newAssets?: Asset[];
  // Animation build target
  animationId?: string;
}
