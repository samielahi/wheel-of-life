import {
  Animation,
  AnimationAction,
  ToolbarType,
  ToolbarAction,
} from "../types";

import {
  setFrame,
  deleteFrames,
  setAsset,
  deleteAsset,
  setAnimation,
} from "./idb";

export function AnimationReducer(draft: Animation, action: AnimationAction) {
  const currentAssets = draft.assets!;
  const frames = draft.frames!;

  switch (action.type) {
    case "rehydrate": {
      const newAnimationState = action.animationState!;
      draft.assets = newAnimationState.assets;
      draft.frames = newAnimationState.frames;
      break;
    }

    case "nameChange": {
      console.log(`Name changed to ${action.newName}`);
      draft.name = action.newName;
      // Update record in idb, need to get animation first however
      // setAnimation({
      //   id: draft.id!,
      //   name: draft.name!,
      //   isBuilt: draft.isBuilt!,
      //   build: undefined,
      // });
      break;
    }

    case "assignImage": {
      console.log(`Image assigned to frame ${action.targetFrame!}`);
      const targetFrame = draft.frames?.find(
        (frame) => frame.id === action.targetFrame
      );
      const assetId = action.assetId!;
      // Assign the asset to the target frame
      targetFrame!.assetId = assetId;
      // Update the asset with the frame's id
      currentAssets[assetId].assignedFrames?.push(action.targetFrame!);
      // Set the new frame's data in idb we need to copy
      // Note we'll need copy the object because draft is a Proxy object
      setFrame({ ...targetFrame! });
      break;
    }

    case "deassignImage": {
      console.log(`Image deassigned from frame ${action.targetFrame!}`);
      const targetFrame = draft.frames?.find(
        (frame) => frame.id === action.targetFrame
      );
      const assetId = action.assetId!;
      targetFrame!.assetId = undefined;
      // Remove target frame from list of frames that have the asset assigned to it
      currentAssets[assetId].assignedFrames = currentAssets[
        assetId
      ].assignedFrames?.filter((id) => id !== targetFrame?.id);

      setFrame({ ...targetFrame! });
      break;
    }

    case "uploadAsset": {
      console.log(`Asset uploaded`);
      const assetId = action.uploadedAsset?.id!;
      currentAssets![assetId] = action.uploadedAsset!;
      // Update idb asset store
      setAsset(action.uploadedAsset!);
      break;
    }

    case "deleteAsset": {
      console.log(`Selected asset deleted`);
      const assetId = action.assetId!;
      const assignedFrames = currentAssets[assetId].assignedFrames;

      // Remove the image from all frames its assigned to
      assignedFrames?.forEach((frameId) => {
        const frameIdx = frameId - 1;
        frames[frameIdx].assetId = undefined;
        setFrame({ ...frames[frameIdx] });
      });

      // Delete from assets state and Idb store
      delete currentAssets![assetId];
      deleteAsset(assetId);
      break;
    }

    case "deleteAssets": {
      console.log(`Selected assets deleted`);
      const deleteTargets = draft.selectedAssets!;

      deleteTargets.forEach((assetId) => {
        // Get all frame ids that contain this asset
        const assignedFrames = currentAssets[assetId].assignedFrames;
        // Remove asset from frames
        assignedFrames?.forEach((frameId) => {
          const frameIdx = frameId - 1;
          frames[frameIdx].assetId = undefined;
          setFrame({ ...frames[frameIdx] });
        });
        delete currentAssets![assetId];
        deleteAsset(assetId);
      });

      draft.selectedAssets = [];
      break;
    }

    case "selectAsset": {
      console.log("Asset selected");
      draft.selectedAssets?.push(action.assetId!);
      currentAssets[action.assetId!].isSelected = true;
      currentAssets[action.assetId!].selectionId = action.selectionId;
      break;
    }

    case "deselectAsset": {
      console.log("Asset Deselected");
      const selectedAssets = draft.selectedAssets!;
      const numSelectedAssets = selectedAssets.length;
      const assetId = action.assetId!;

      draft.selectedAssets = selectedAssets?.filter(
        (assetId) => assetId !== action.assetId
      );
      currentAssets[assetId].isSelected = false;

      const deselectedId = currentAssets[assetId].selectionId!;
      selectedAssets!.forEach((assetId) => {
        if (deselectedId < currentAssets[assetId].selectionId!) {
          currentAssets[assetId].selectionId!--;
        }
      });
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

    case "message": {
      draft.message = action.message;
      break;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
