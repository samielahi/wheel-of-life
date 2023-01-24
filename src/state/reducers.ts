import {
  Animation,
  AnimationAction,
  ToolbarType,
  ToolbarAction,
} from "../types";

export function AnimationReducer(draft: Animation, action: AnimationAction) {
  const currentAssets = draft.assets!;
  const frames = draft.frames!;

  switch (action.type) {
    case "nameChange": {
      draft.name = action.newName;
      break;
    }

    case "assignImage": {
      const targetFrame = draft.frames?.find(
        (frame) => frame.id === action.targetFrame
      );
      const assetId = action.assetId!;
      // Assign the asset to the target frame
      targetFrame!.data = currentAssets[assetId];
      // Update the asset with the frame's id
      currentAssets[assetId].assignedFrames?.push(targetFrame!.id);

      break;
    }

    case "deassignImage": {
      const targetFrame = draft.frames?.find(
        (frame) => frame.id === action.targetFrame
      );
      const assetId = action.assetId!;
      targetFrame!.data = undefined;
      // Remove target frame from list of frames that have the asset assigned to it
      currentAssets[assetId].assignedFrames = currentAssets[
        assetId
      ].assignedFrames?.filter((id) => id !== targetFrame?.id);
      break;
    }

    case "uploadAsset": {
      const assetId = action.uploadedAsset?.id!;
      currentAssets![assetId] = action.uploadedAsset!;
      break;
    }

    case "deleteAsset": {
      const assetId = action.assetId!;
      const assignedFrames = currentAssets[assetId].assignedFrames;

      // Remove the image from all frames its assigned to
      assignedFrames?.forEach((i) => {
        frames[i].data = undefined;
      });

      // Delete from assets
      delete currentAssets![assetId];
      break;
    }

    case "uploadAssets": {
      const uploadedAssets = action.uploadedAssets;

      uploadedAssets?.forEach((asset) => {
        const id = asset.id!;
        currentAssets![id] = asset;
      });

      break;
    }

    case "deleteAssets": {
      const deleteTargets = draft.selectedAssets!;

      deleteTargets.forEach((assetId) => {
        // Get all frame ids that contain this asset
        const assignedFrames = currentAssets[assetId].assignedFrames;
        // Remove asset from frames
        assignedFrames?.forEach((frameId) => {
          frames[frameId].data = undefined;
        });
        delete currentAssets![assetId];
      });

      draft.selectedAssets = [];
      break;
    }

    case "selectAsset": {
      console.log("selection made");
      draft.selectedAssets?.push(action.assetId!);
      currentAssets[action.assetId!].isSelected = true;
      break;
    }

    case "deselectAsset": {
      console.log("deselection made");
      draft.selectedAssets = draft.selectedAssets?.filter(
        (assetId) => assetId !== action.assetId
      );
      currentAssets[action.assetId!].isSelected = false;
      break;
    }

    case "deselectAll": {
      draft.selectedAssets?.map((assetId) => {
        currentAssets[assetId].isSelected = false;
      });

      draft.selectedAssets = [];
      break;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export function ToolbarReducer(draft: ToolbarType, action: ToolbarAction) {
  switch (action.type) {
    case "startSelection": {
      console.log("Selection Started");
      draft.status = "selecting";
      break;
    }

    case "endSelection": {
      console.log("Selection Cancelled");
      draft.status = "idle";
      break;
    }

    case "startAssignment": {
      draft.status = "assigning";
      break;
    }

    case "endAssignment": {
      draft.status = "idle";
      break;
    }

    case "tooltip": {
      draft.message = action.message;
      break;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
