import { Frame, AnimationDispatch } from "../../types";
import { useContext } from "react";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
} from "../../state/context";

export default function ImageFrame(props: Frame) {
  const animation = useContext(AnimationContext);
  const dispatchAnimationAction = useContext<AnimationDispatch>(AnimationDispatchContext);
  const toolbar = useContext(ToolbarContext);
  const assets = animation.assets!;

  const assetExists = props.assetId! && assets[props.assetId];
  let assignedImage: Blob;
  let assignedImageURL;

  if (assetExists) {
    assignedImage = assets[props.assetId!].data;
    assignedImageURL = URL.createObjectURL(assignedImage);
  }

  function assignImage() {
    const currentAssetId = animation.selectedAssets![0];

    if (toolbar.status === "selecting" && currentAssetId) {
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
        style={
          toolbar.status === "selecting" ? { cursor: "copy", pointerEvents: "auto" } : {}
        }
        className="group relative -mt-[3px] -mb-[3px] -ml-[3px] h-[400px] w-[300px] border-[3px] border-smoke"
      >
        <span className="absolute left-[42%] top-4 z-10 h-fit rounded bg-smoke p-2 drop-shadow-sm">
          {props.id + 1 < 10 ? `00${props.id}` : `0${props.id}`}
        </span>

        {assetExists ? (
          <img
            className="h-full w-full"
            src={assignedImageURL}
            alt={`Frame ${props.id}'s image`}
          />
        ) : null}

        {assetExists && toolbar.status !== "selecting" ? (
          <>
            <span
              onClick={deassignImage}
              className="invisible absolute left-[80%] bottom-[5%] z-10 h-fit cursor-pointer rounded bg-smoke p-2  text-violet group-hover:visible"
            >
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
            </span>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
