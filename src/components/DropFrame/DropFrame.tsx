import { Frame, AnimationDispatch } from "../../types";
import { useContext } from "react";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
} from "../../state/context";

export default function DropFrame(props: Frame) {
  const animation = useContext(AnimationContext);
  const dispatchAnimationAction = useContext<AnimationDispatch>(
    AnimationDispatchContext
  );
  const toolbar = useContext(ToolbarContext);

  function assignImage() {
    const currentAssetId = animation.selectedAssets![0];

    if (toolbar.status === "selecting" && currentAssetId) {
      dispatchAnimationAction({
        type: "assignImage",
        targetFrame: props.id,
        assetId: currentAssetId,
      });

      dispatchAnimationAction({
        type: "deselectAsset",
        assetId: currentAssetId,
      });
    }

    console.log(animation.selectedAssets!);
  }

  function deassignImage() {
    dispatchAnimationAction({
      type: "deassignImage",
      targetFrame: props.id,
      assetId: props.data?.id,
    });
  }

  return (
    <>
      <div
        onClick={assignImage}
        style={
          toolbar.status === "selecting"
            ? { cursor: "copy", pointerEvents: "auto" }
            : {}
        }
        className="group -mt-[3px] -mb-[3px] -ml-[3px] w-[300px] h-[400px] relative border-[3px] border-smoke"
      >
        <span className="absolute bg-smoke p-2 rounded h-fit left-[42%] top-4 z-10">
          {props.id + 1 < 10 ? `00${props.id + 1}` : `0${props.id + 1}`}
        </span>

        {props.data ? (
          <img src={props.data?.data} alt={`Frame ${props.id}'s image`} />
        ) : null}

        {props.data && toolbar.status !== "selecting" ? (
          <>
            <span
              onClick={deassignImage}
              className="invisible group-hover:visible cursor-pointer absolute text-violet z-10 rounded p-2  bg-smoke h-fit left-[80%] bottom-[5%]"
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
