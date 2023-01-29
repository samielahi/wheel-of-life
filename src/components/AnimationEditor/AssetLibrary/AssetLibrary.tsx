import Image from "./Image";
import { useContext } from "react";
import { AnimationContext, ToolbarContext } from "../../../state/context";

export default function AssetLibrary() {
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
        className="w-full h-full flex overflow-auto pl-8 pr-8 justify-center flex-col"
      >
        <div className="w-full flex gap-8">
          {hasAssets ? (
            <>
              {assets.map((asset, i) => (
                <Image
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
              <div className="w-full flex justify-center">
                <div className="p-10 border-4 border-smoke rounded border-dashed">
                  <span className="text-gray italic">Upload some images to get started.</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
