import { useContext, useMemo } from "react";
import { AnimationEditorContext, ToolbarContext } from "../../state/context";
import Asset from "./Asset";
import { sortAssetsAlphaNumerically } from "../../utils";

// Renders a horizontally scrollable section of the current Assets in the animation
export default function AssetList() {
  const animation = useContext(AnimationEditorContext);
  const toolbar = useContext(ToolbarContext)!;
  const isSelecting = toolbar.status === "selecting";
  const assets = useMemo(() => Object.values(animation!.assets!), [animation!.assets!]);
  const animationHasAssets = assets.length !== 0;
  // Get asset list and sort in alphanumeric order
  const sortedAssets = assets.sort(sortAssetsAlphaNumerically);

  return (
    <>
      <div
        style={
          isSelecting && animationHasAssets
            ? { backgroundColor: "#FCFBF4", pointerEvents: "auto", cursor: "pointer" }
            : {}
        }
        className="scrollbar flex h-max w-full flex-col justify-center overflow-x-auto bg-bg p-8 duration-300 ease-in-out"
      >
        <div className="flex w-max gap-8">
          {animationHasAssets ? (
            <>
              {sortedAssets.map((asset, i) => (
                <Asset
                  key={i}
                  id={asset.id}
                  data={asset.data}
                  isSelected={asset.isSelected}
                  selectionId={asset.selectionId}
                />
              ))}
            </>
          ) : (
            <>
              {/* If the animation has no assets show a message */}
              <div className="flex w-full justify-center">
                <div className="rounded border-4 border-dashed border-smoke p-10">
                  <span className="italic text-gray">
                    Upload some images to get started (png, jpg).
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
