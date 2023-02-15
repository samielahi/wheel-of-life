import { useContext, useMemo } from "react";
import { AnimationEditorContext, ToolsContext } from "../../state/context";
import Asset from "./Asset";
import { sortAssetsAlphaNumerically } from "../../utils";
import { useAutoAnimate } from "@formkit/auto-animate/react";

// Renders a horizontally scrollable section of the current Assets in the animation
export default function AssetList() {
  const animation = useContext(AnimationEditorContext);
  const tools = useContext(ToolsContext)!;
  const isSelecting = tools.status === "selecting";
  const assets = useMemo(() => Object.values(animation!.assets!), [animation!.assets!]);
  const animationHasAssets = assets.length !== 0;
  // Get asset list and sort in alphanumeric order
  const sortedAssets = assets.sort(sortAssetsAlphaNumerically);

  return (
    <>
      <div
        style={
          isSelecting && animationHasAssets
            ? { pointerEvents: "auto", cursor: "pointer" }
            : {}
        }
        className="scrollbar -z-1 flex h-max w-full flex-col justify-center overflow-x-auto bg-bg p-8 duration-300 ease-in-out"
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
              <div className="fixed ml-[calc(50%_-_250px)] mt-[5%]">
                <div className="rounded border-2 border-dashed border-lightViolet bg-white p-10">
                  <p className="text-md flex gap-2 italic text-gray">
                    Upload
                    <span className="text-violet">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M12 12v6"></path>
                        <path d="m15 15-3-3-3 3"></path>
                      </svg>
                    </span>
                    some images to get started (png, jpg).
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
