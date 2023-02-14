import { useContext, memo } from "react";
import {
  AnimationEditorContext,
  AnimationEditorDispatchContext,
  ToolbarContext,
} from "../../state/context";
import { Frame as FrameType } from "../../types";
import FrameCount from "./FrameCount";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function Frame(props: FrameType) {
  const animation = useContext(AnimationEditorContext);
  const dispatchAnimationAction = useContext(AnimationEditorDispatchContext)!;
  const toolbar = useContext(ToolbarContext)!;
  const isSelecting = toolbar.status === "selecting";
  const assets = animation!.assets!;
  const assetExists = props.assetId! && assets[props.assetId] ;
  const currentAssetId = animation!.selectedAssets![0];
  let assignedImage: Blob;
  let assignedImageURL;
  const [animationParent] = useAutoAnimate();

  if (assetExists) {
    assignedImage = assets[props.assetId!].data;
    assignedImageURL = URL.createObjectURL(assignedImage);
  }

  function assignImage() {
    if (isSelecting && currentAssetId) {
      dispatchAnimationAction({
        type: "ASSIGN_IMAGE",
        targetFrame: props.id,
        assetId: currentAssetId,
      });

      dispatchAnimationAction({
        type: "DESELECT_ASSET",
        assetId: currentAssetId,
      });
    }
  }

  function deassignImage() {
    dispatchAnimationAction({
      type: "DEASSIGN_IMAGE",
      targetFrame: props.id,
      assetId: props.assetId!,
    });
  }

  return (
    <>
      <div
        ref={animationParent}
        onClick={assignImage}
        style={isSelecting ? { cursor: "copy", pointerEvents: "auto" } : {}}
        className="relative h-[260px] w-[195px] rounded-xl bg-white drop-shadow-sm air:h-[400px] air:w-[300px]"
      >
        {/* Render the frame id (between 1 - 16) */}
        <FrameCount onClick={deassignImage} frameId={props.id} hasAsset={assetExists!} />
        {/* Render the asset if there is one assigned and it exists */}
        {assetExists ? (
          <img
            draggable={false}
            className="h-full w-full rounded-lg opacity-80"
            src={assignedImageURL}
            alt={`Frame ${props.id}'s image`}
          ></img>
        ) : (
          <div className="h-full w-full p-8">
            <div className="h-full w-full rounded-xl border-2 border-dashed border-silver"></div>
          </div>
        )}
      </div>
    </>
  );
}

export default memo(Frame);
