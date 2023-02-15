import {
  AnimationState,
  AnimationEditorAction,
  ToolbarState,
  ToolbarAction,
  AnimationMenuAction,
  AnimationMenuState,
} from "../types";
import { sortAssetsAlphaNumerically } from "../utils";
import {
  setFrame,
  deleteFrames,
  setAsset,
  deleteAsset,
  deleteAssets,
  setAnimation,
  deleteAnimation,
} from "./idb";

export function AnimationMenuReducer(
  draft: AnimationMenuState,
  action: AnimationMenuAction
) {
  switch (action.type) {
    case "REHYDRATE": {
      return [...action.animations];
    }

    case "NEW_ANIMATION": {
      draft.push(action.animation);
      setAnimation(action.animation);
      break;
    }

    case "DELETE_ANIMATION": {
      deleteAnimation(action.animationId);
      deleteFrames(action.animationId);
      deleteAssets(action.animationId);
      return draft.filter((animation) => animation.id !== action.animationId);
    }

    case "NAME_CHANGE": {
      const targetAnimation = draft.find(
        (animation) => action.animationId === animation.id
      )!;
      // Don't set if name is the same as before
      if (targetAnimation.name !== action.name) {
        targetAnimation.name = action.name;
        setAnimation({ ...targetAnimation! });
      }
      break;
    }

    case "SET_THUMBNAIL": {
      const targetAnimation = draft.find(
        (animation) => action.animationId === animation.id
      )!;

      if (targetAnimation) {
        targetAnimation.thumbnail = action.image;
        setAnimation({ ...targetAnimation });
      }
      break;
    }

    default: {
      throw Error("Unknown action: " + action);
    }
  }
}

export function AnimationEditorReducer(
  draft: AnimationState,
  action: AnimationEditorAction
) {
  const currentAssets = draft.assets!;
  const frames = draft.frames!;

  switch (action.type) {
    case "BUILD": {
      console.log("Strip built successfully");
      draft.isBuilt = true;
      break;
    }

    case "REHYDRATE": {
      const newAnimationState = action.animation!;
      draft.assets = newAnimationState.assets;
      draft.frames = newAnimationState.frames;
      draft.isBuilt = newAnimationState.isBuilt;
      draft.thumbnail = newAnimationState.thumbnail;
      draft.lastBuildTime = newAnimationState.lastBuildTime;
      // Check which frames are filled and update state
      draft.frames?.forEach((frame) => {
        const isAssigned = typeof frame.assetId! === "string";
        if (isAssigned) {
          draft.filledFrames?.add(frame.id);
        }
      });

      break;
    }

    case "ASSIGN_IMAGE": {
      console.log(`Image assigned to frame ${action.targetFrame!}`);
      // Add the target frames to the Set of filled frames
      draft.filledFrames?.add(action.targetFrame!);
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
      // Remove the target frames to the Set of filled frames
      draft.filledFrames?.delete(action.targetFrame!);
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

    case "DEASSIGN_ALL": {
      // Get all the frames that currently have images assigned to them
      const targetFrames = draft.filledFrames!.values();
      for (const frameId of targetFrames) {
        // Grab the assetId so we can modify its assigned frames
        const assetId = frames[frameId - 1].assetId!;
        frames[frameId - 1].assetId = undefined;
        currentAssets[assetId].assignedFrames = currentAssets[
          assetId
        ].assignedFrames?.filter((id) => id !== frameId);

        // Update idb with new modified frame and asset
        setFrame({ ...frames[frameId - 1] });
        setAsset({ ...currentAssets[assetId] });
      }
      // Clear the set
      draft.filledFrames?.clear();

      break;
    }

    case "AUTO_ASSIGN": {
      const assetsSortedByFilename = Object.values(currentAssets).sort(
        sortAssetsAlphaNumerically
      );

      assetsSortedByFilename.forEach((asset, i) => {
        draft.filledFrames?.add(i + 1);
        const assignedFrames = [...asset.assignedFrames!, i + 1];
        asset.assignedFrames = assignedFrames;
        frames[i].assetId = asset.id;
        // Update idb with new modified frame and asset
        setFrame({ ...frames[i] });
        setAsset({ ...asset });
      });

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
          draft.filledFrames?.delete(frameId);
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

    default: {
      throw Error("Unknown action: " + action);
    }
  }
}
