import { useContext } from "react";
import {
  AnimationDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../../state/context";
import { Asset, AnimationDispatch, ToolbarDispatch } from "../../types";

export default function Image(props: Asset) {
  const dispatchAnimationAction = useContext<AnimationDispatch>(
    AnimationDispatchContext
  );
  const toolbar = useContext(ToolbarContext);
  const dispatchToolbarAction = useContext<ToolbarDispatch>(
    ToolbarDispatchContext
  );

  function handleSelection() {
    if (toolbar.status === "selecting") {
      if (!props.isSelected) {
        dispatchAnimationAction({
          type: "selectAsset",
          assetId: props.id,
        });

        dispatchToolbarAction({
          type: "tooltip",
          message: "Click a frame to assign selected images.",
        });
      } else {
        dispatchAnimationAction({
          type: "deselectAsset",
          assetId: props.id,
        });

        dispatchToolbarAction({
          type: "tooltip",
          message: "Click any images below to select them.",
        });
      }
    }
  }

  return (
    <>
      <div onClick={handleSelection}>
        <img
          src={props.data}
          alt="a cute kitten"
          style={props.isSelected ? { borderColor: "#9c8cdf" } : {}}
          className="opacity-80 w-[150px] h-[200px] border-4 border-smoke rounded cursor-pointer"
        />
      </div>
    </>
  );
}
