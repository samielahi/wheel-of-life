import { AnimationState, AnimationAction, ToolbarState, ToolbarAction } from "../types";

import { setFrame, deleteFrames, setAsset, deleteAsset, setAnimation } from "./idb";

export function AnimationReducer(draft: AnimationState, action: AnimationAction) {
  const currentAssets = draft.assets!;
  const frames = draft.frames!;

  switch (action.type) {
    case "REHYDRATE": {
      const newAnimationState = action.animation!;
      draft.assets = newAnimationState.assets;
      draft.frames = newAnimationState.frames;
      break;
    }

    case "NAME_CHANGE": {
      console.log(`Name changed to ${action.name}`);
      draft.name = action.name;
      // Update record in idb, need to get animation first however
      // setAnimation({
      //   id: draft.id!,
      //   name: draft.name!,
      //   isBuilt: draft.isBuilt!,
      //   build: undefined,
      // });
      break;
    }

    case "ASSIGN_IMAGE": {
      console.log(`Image assigned to frame ${action.targetFrame!}`);
      const targetFrame = draft.frames?.find((frame) => frame.id === action.targetFrame);
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

    case "DEASSIGN_IMAGE": {
      console.log(`Image deassigned from frame ${action.targetFrame!}`);
      const targetFrame = draft.frames?.find((frame) => frame.id === action.targetFrame);
      const assetId = action.assetId!;
      targetFrame!.assetId = undefined;
      // Remove target frame from list of frames that have the asset assigned to it
      currentAssets[assetId].assignedFrames = currentAssets[
        assetId
      ].assignedFrames?.filter((id) => id !== targetFrame?.id);

      setFrame({ ...targetFrame! });
      break;
    }

    case "UPLOAD_ASSET": {
      console.log(`Asset uploaded`);
      const assetId = action.asset?.id!;
      currentAssets![assetId] = action.asset!;
      // Update idb asset store
      setAsset(action.asset!);
      break;
    }

    case "DELETE_ASSETS": {
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

    case "SELECT_ASSET": {
      console.log("Asset selected");
      draft.selectedAssets?.push(action.assetId!);
      currentAssets[action.assetId!].isSelected = true;
      currentAssets[action.assetId!].selectionId = action.selectionId;
      break;
    }

    case "DESELECT_ASSET": {
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

    case "DESELECT_ALL": {
      draft.selectedAssets?.map((assetId) => {
        currentAssets[assetId].isSelected = false;
      });

      draft.selectedAssets = [];
      break;
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

export function ToolbarReducer(draft: ToolbarState, action: ToolbarAction) {
  switch (action.type) {
    case "STATUS_CHANGE": {
      console.log(`Status Changed to : ${action.newStatus}`);
      draft.status = action.newStatus;
      break;
    }

    case "MESSAGE": {
      draft.message = action.message;
      break;
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
