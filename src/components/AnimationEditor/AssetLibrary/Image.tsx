import { useContext, useRef } from "react";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
} from "../../../state/context";
import { Asset, AnimationDispatch } from "../../../types";

export default function Image(props: Asset) {
  const animation = useContext(AnimationContext);
  const dispatchAnimationAction = useContext<AnimationDispatch>(AnimationDispatchContext);
  const toolbar = useContext(ToolbarContext);
  const numSelectedAssets = animation.selectedAssets?.length!;
  const selectionId = useRef<number>();

  function handleSelection() {
    if (toolbar.status === "selecting") {
      if (!props.isSelected) {
        selectionId.current = numSelectedAssets + 1;
        dispatchAnimationAction({
          type: "selectAsset",
          assetId: props.id,
          selectionId: selectionId.current,
        });
      } else {
        dispatchAnimationAction({
          type: "deselectAsset",
          assetId: props.id,
        });
      }
    }
  }

  const imgObjectURL = URL.createObjectURL(props.data);

  return (
    <>
      <div onClick={handleSelection} className="relative ease-in-out duration-300">
        <span
          style={!props.isSelected ? { display: "none" } : {}}
          className="ease-in-out duration-100 bg-violet text-white rounded-full text-center w-6 h-6 absolute z-10 left-[90%] bottom-[94%]"
        >
          {props.selectionId}
        </span>
        <img
          src={imgObjectURL}
          alt="a cute kitten"
          style={props.isSelected ? { borderColor: "#9c8cdf" } : {}}
          className="w-[195px] h-[260px] border-4 border-smoke  cursor-pointer"
        />
      </div>
    </>
  );
}
