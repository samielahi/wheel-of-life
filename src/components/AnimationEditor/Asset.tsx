import { useContext, useRef } from "react";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
} from "../../state/context";
import { Asset as AssetType } from "../../types";
import { AnimationDispatch } from "../../types";

export default function Asset(props: AssetType) {
  const animation = useContext(AnimationContext);
  const dispatchAnimationAction = useContext<AnimationDispatch>(
    AnimationDispatchContext
  );
  const toolbar = useContext(ToolbarContext);
  const numSelectedAssets = animation.selectedAssets?.length!;
  const selectionId = useRef<number>();

  function handleSelection() {
    if (toolbar.status === "selecting") {
      if (!props.isSelected) {
        selectionId.current = numSelectedAssets + 1;
        dispatchAnimationAction({
          type: "SELECT_ASSET",
          assetId: props.id,
          selectionId: selectionId.current,
        });
      } else {
        dispatchAnimationAction({
          type: "DESELECT_ASSET",
          assetId: props.id,
        });
      }
    }
  }

  const imgObjectURL = URL.createObjectURL(props.data);

  return (
    <>
      <div
        onClick={handleSelection}
        className="ease-[cubic-bezier(1.7, 0, 0.84, 0)] relative duration-300 hover:-translate-y-3"
      >
        <span
          style={!props.isSelected ? { display: "none" } : {}}
          className="absolute left-[90%] bottom-[94%] z-10 h-6 w-6 rounded-full bg-violet text-center text-white duration-200 ease-in-out"
        >
          {props.selectionId}
        </span>
        <img
          src={imgObjectURL}
          alt="a cute kitten"
          style={props.isSelected ? { borderColor: "#9c8cdf" } : {}}
          className="h-[200px] w-[150px] cursor-pointer rounded border-[3px] border-smoke bg-white opacity-80 drop-shadow-sm duration-300 ease-in-out"
        />
      </div>
    </>
  );
}
