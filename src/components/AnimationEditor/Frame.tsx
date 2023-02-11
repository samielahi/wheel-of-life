import { useContext, memo, useState } from "react";
import {
  AnimationEditorContext,
  AnimationEditorDispatchContext,
  ToolbarContext,
} from "../../state/context";
import { Frame as FrameType } from "../../types";

const FrameCount = (props: { frameId: number; onClick: () => void }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={props.onClick}
        className="text-md absolute left-[calc(100%_-_60px)] top-4 z-10 h-[40px] w-[40px] cursor-pointer rounded-full bg-yellow pt-2 text-center text-gray drop-shadow-md hover:bg-orange"
      >
        {hovered ? (
          <span className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        ) : (
          <span>
            {props.frameId + 1 <= 10 ? `0${props.frameId}` : `${props.frameId}`}
          </span>
        )}
      </div>
    </>
  );
};

function Frame(props: FrameType) {
  const animation = useContext(AnimationEditorContext);
  const dispatchAnimationAction = useContext(AnimationEditorDispatchContext)!;
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
        className="relative h-[260px] w-[195px] rounded-xl bg-white drop-shadow-sm air:h-[400px] air:w-[300px]"
      >
        {/* Render the frame id (between 1 - 16) */}
        <FrameCount onClick={deassignImage} frameId={props.id} />
        {/* Render the asset if there is one assigned and it exists */}
        {assetExists ? (
          <img
            draggable={false}
            className="h-full w-full rounded-lg opacity-80"
            src={assignedImageURL}
            alt={`Frame ${props.id}'s image`}
          />
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
