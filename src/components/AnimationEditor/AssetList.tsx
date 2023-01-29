import Asset from "./Asset";
import { useContext } from "react";
import { AnimationContext, ToolbarContext } from "../../state/context";

export default function AssetList() {
  const animation = useContext(AnimationContext);
  const toolbar = useContext(ToolbarContext);
  const assets = Object.values(animation.assets!);
  const hasAssets = assets.length !== 0;

  return (
    <>
      <div
        style={
          toolbar.status === "selecting" && hasAssets
            ? { backgroundColor: "#FCFBF4" }
            : {}
        }
        className="flex h-full w-full flex-col justify-center overflow-auto pl-8 pr-8"
      >
        <div className="flex w-full gap-8">
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
                    Upload some images to get started.
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
