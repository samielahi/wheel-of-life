import { useContext, useRef, memo } from "react";
import {
  AnimationEditorContext,
  AnimationEditorDispatchContext,
  ToolsContext,
} from "../../state/context";
import { Asset as AssetType } from "../../types";

function Asset(props: AssetType) {
  const animation = useContext(AnimationEditorContext);
  const dispatchEditorAction = useContext(AnimationEditorDispatchContext)!;
  const tools = useContext(ToolsContext)!;
  const numSelectedAssets = animation!.selectedAssets?.length!;
  const selectionId = useRef<number>();
  const imgObjectURL = URL.createObjectURL(props.data);
  const isSelecting = tools.status === "selecting";

  function handleSelection() {
    if (isSelecting) {
      if (!props.isSelected) {
        selectionId.current = numSelectedAssets + 1;
        dispatchEditorAction({
          type: "SELECT_ASSET",
          assetId: props.id,
          selectionId: selectionId.current,
        });
      } else {
        // If asset is selected we deselect if clicked on again
        dispatchEditorAction({
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
        style={props.isSelected ? { borderColor: "#9c8cdf" } : {}}
        className="-z-1 relative rounded-xl border-4 border-smoke bg-white duration-300 ease-in-out"
      >
        {/* Render selection id on top right if Asset is selected */}
        <span
          style={!props.isSelected ? { display: "none" } : {}}
          className="absolute left-[93%] bottom-[95%] z-[2] w-6 rounded-full bg-violet text-center  text-white duration-200 ease-in-out"
        >
          {props.selectionId}
        </span>

        <img
          tabIndex={isSelecting ? 0 : -1}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              handleSelection();
            }
          }}
          src={imgObjectURL}
          draggable={false}
          // Use file name as alt text
          alt={props.data.name}
          className="relative h-[200px] w-[150px] rounded-lg bg-white opacity-80 focus:outline-2 focus:outline-offset-4 focus:outline-violet air:h-[260px] air:w-[195px]"
        />
      </div>
    </>
  );
}

export default memo(Asset);
