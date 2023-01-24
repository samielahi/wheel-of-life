import Image from "./Image";
import { useContext } from "react";
import { AnimationContext, ToolbarContext } from "../../state/context";

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
        className="w-full flex overflow-auto h-full wrapper flex-col"
      >
        <div className="w-max flex gap-8 pt-8 pb-8">
          {hasAssets ? (
            <>
              {assets.map((asset, i) => (
                <Image
                  key={i}
                  id={asset.id}
                  data={asset.data}
                  isSelected={asset.isSelected}
                />
              ))}
            </>
          ) : (
            <>
              <div>Upload some images to get started.</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
