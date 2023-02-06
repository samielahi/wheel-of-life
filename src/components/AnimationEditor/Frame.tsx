import { useContext, useMemo, memo } from "react";
import {
  AnimationEditorContext,
  AnimationEditorDispatchContext,
  ToolbarContext,
} from "../../state/context";
import { AnimationDispatch } from "../../types";
import { Frame as FrameType } from "../../types";
import IconButton from "../../core/IconButton";

const FrameCount = (props: { frameId: number }) => (
  <>
    <span className="absolute left-[5%] top-2 z-10 h-fit rounded bg-smoke p-2 text-sm opacity-60 drop-shadow-sm">
      {props.frameId + 1 <= 10 ? `0${props.frameId}` : `${props.frameId}`}
    </span>
  </>
);

const DeassignButton = (props: { deassignImage: () => void }) => (
  <>
    <div className="absolute left-[calc(95%_-_30px)] top-2 z-10 h-fit cursor-pointer group-hover:visible sm:invisible lg:left-[calc(95%_-_50px)] ">
      <IconButton onClick={props.deassignImage} tooltip="remove">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 9v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path>
          <line x1="16" y1="5" x2="22" y2="5"></line>
          <circle cx="9" cy="9" r="2"></circle>
          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
        </svg>
      </IconButton>
    </div>
  </>
);

function Frame(props: FrameType) {
  const animation = useContext(AnimationEditorContext);
  const dispatchAnimationAction = useContext<AnimationDispatch>(
    // @ts-ignore
    AnimationEditorDispatchContext
  );
  const toolbar = useContext(ToolbarContext)!;
  const isSelecting = toolbar.status === "selecting";
  const assets = animation!.assets!;
  const assetExists = props.assetId! && assets[props.assetId];
  const currentAssetId = animation!.selectedAssets![0];
  let assignedImage: Blob;
  let assignedImageURL;

  // Don't use hook in conditional
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
        onClick={assignImage}
        style={isSelecting ? { cursor: "copy", pointerEvents: "auto" } : {}}
        className="group relative -mt-[3px] -mb-[3px] -ml-[3px] h-[260px] w-[195px] border-[3px] border-smoke air:h-[400px] air:w-[300px] "
      >
        {/* Render the frame id (between 1 - 16) */}
        <FrameCount frameId={props.id} />
        {/* Render the asset if there is one assigned and it exists */}
        {assetExists ? (
          <img
            className="h-full w-full opacity-80"
            src={assignedImageURL}
            alt={`Frame ${props.id}'s image`}
          />
        ) : null}

        {/* Button to deassign/remove the image from the frame */}
        {assetExists && !isSelecting ? (
          <DeassignButton deassignImage={deassignImage} />
        ) : null}
      </div>
    </>
  );
}

export default memo(Frame);
