import { useContext, useRef, memo } from "react";
import {
  AnimationEditorContext,
  AnimationEditorDispatchContext,
  ToolbarContext,
} from "../../state/context";
import { Asset as AssetType } from "../../types";
import { AnimationDispatch } from "../../types";

function Asset(props: AssetType) {
  const animation = useContext(AnimationEditorContext);
  const dispatchAnimationAction = useContext<AnimationDispatch>(
    AnimationEditorDispatchContext
  );
  const toolbar = useContext(ToolbarContext);
  const numSelectedAssets = animation!.selectedAssets?.length!;
  const selectionId = useRef<number>();
  // No need for useMemo since we prevent rerenders with same props using memo
  const imgObjectURL = URL.createObjectURL(props.data);

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
        // If asset is selected we deselect if clicked on again
        dispatchAnimationAction({
          type: "DESELECT_ASSET",
          assetId: props.id,
        });
      }
    }
  }

  return (
    <>
      <div
        onClick={handleSelection}
        className="ease-[cubic-bezier(1.7, 0, 0.84, 0)] relative duration-300 "
      >
        {/* Render selection id on top right if Asset is selected */}
        <span
          style={!props.isSelected ? { display: "none" } : {}}
          className="absolute left-[90%] bottom-[94%] z-10 h-6 w-6 rounded-full bg-violet text-center text-white duration-200 ease-in-out"
        >
          {props.selectionId}
        </span>

        <img
          src={imgObjectURL}
          // Use file name as alt text
          alt={props.data.name}
          style={props.isSelected ? { borderColor: "#9c8cdf" } : {}}
          className="h-[200px] w-[150px] rounded border-[3px] border-smoke bg-white opacity-80 drop-shadow-sm duration-300 ease-in-out air:h-[260px] air:w-[195px]"
        />
      </div>
    </>
  );
}

export default memo(Asset);
