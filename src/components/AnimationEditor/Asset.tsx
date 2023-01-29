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
  const dispatchAnimationAction = useContext<AnimationDispatch>(AnimationDispatchContext);
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
      <div onClick={handleSelection} className="relative duration-300 ease-in-out">
        <span
          style={!props.isSelected ? { display: "none" } : {}}
          className="absolute left-[90%] bottom-[94%] z-10 h-6 w-6 rounded-full bg-violet text-center text-white duration-100 ease-in-out"
        >
          {props.selectionId}
        </span>
        <img
          src={imgObjectURL}
          alt="a cute kitten"
          style={props.isSelected ? { borderColor: "#9c8cdf" } : {}}
          className="h-[260px] w-[195px] cursor-pointer border-4 border-smoke  opacity-80"
        />
      </div>
    </>
  );
}
