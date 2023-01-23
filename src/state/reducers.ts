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

    case "assignAsset": {
      // const currentAssets = draft.assets!;
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

    case "unassignAsset": {
      // const currentAssets = draft.assets!;
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
      // const currentAssets = draft.assets;
      const assetId = action.uploadedAsset?.id!;
      currentAssets![assetId] = action.uploadedAsset!;
      break;
    }

    case "deleteAsset": {
      // const currentAssets = draft.assets!;
      const assetId = action.assetId!;
      // const frames = draft.frames!;
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
      // const currentAssets = draft.assets;
      const uploadedAssets = action.uploadedAssets;

      uploadedAssets?.forEach((asset) => {
        const id = asset.id!;
        currentAssets![id] = asset;
      });

      break;
    }

    case "deleteAssets": {
      // const currentAssets = draft.assets!;
      const deleteTargets = action.assetIds!;
      // const frames = draft.frames!;

      deleteTargets.forEach((assetId) => {
        // Get all frame ids that contain this asset
        const assignedFrames = currentAssets[assetId].assignedFrames;
        // Remove asset from frames
        assignedFrames?.forEach((frameId) => {
          frames[frameId].data = undefined;
        });
        delete currentAssets![assetId];
      });
      break;
    }

    case "selectAsset": {
      draft.selectedAssets?.push(action.assetId!);
      break;
    }

    case "deselectAsset": {
      draft.selectedAssets = draft.selectedAssets?.filter(
        (assetId) => assetId !== action.assetId
      );
      break;
    }

    case "deselectAll": {
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
      draft.status = "selecting";
      break;
    }

    case "endSelection": {
      draft.status = "idle";
      break;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
