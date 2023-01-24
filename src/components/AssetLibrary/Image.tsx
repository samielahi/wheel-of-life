import { useContext } from "react";
import { AnimationDispatchContext, ToolbarContext } from "../../state/context";
import { Asset, AnimationDispatch } from "../../types";

export default function Image(props: Asset) {
  const dispatchAnimationAction = useContext<AnimationDispatch>(
    AnimationDispatchContext
  );
  const toolbar = useContext(ToolbarContext);

  function handleSelection() {
    if (toolbar.status === "selecting") {
      if (!props.isSelected) {
        dispatchAnimationAction({
          type: "selectAsset",
          assetId: props.id,
        });
      } else {
        dispatchAnimationAction({
          type: "deselectAsset",
          assetId: props.id,
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
