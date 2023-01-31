import Asset from "./Asset";
import { useContext } from "react";
import { AnimationContext, ToolbarContext } from "../../state/context";
import { sortAssetsAlphaNumerically } from "../../utils";

export default function AssetList() {
  const animation = useContext(AnimationContext);
  const toolbar = useContext(ToolbarContext);
  // Get asset list and sort in alphanumeric order
  const assets = Object.values(animation.assets!).sort(sortAssetsAlphaNumerically);
  const hasAssets = assets.length !== 0;

  return (
    <>
      <div
        style={
          toolbar.status === "selecting" && hasAssets
            ? { backgroundColor: "#FCFBF4", pointerEvents: "auto" }
            : {
                pointerEvents: "none",
              }
        }
        className="flex h-full w-full flex-col justify-center overflow-x-auto pl-8 pr-8 duration-300 ease-in-out"
      >
        <div className="flex w-max gap-8">
          {hasAssets ? (
            <>
              {assets.map((asset, i) => (
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
