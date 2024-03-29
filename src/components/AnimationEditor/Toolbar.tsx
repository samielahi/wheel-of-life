import { useContext } from "react";
import { AnimationEditorContext, ToolsContext } from "../../state/context";
import Upload from "../Tools/Upload";
import Select from "../Tools/Select";
import Delete from "../Tools/DeleteImage/DeleteImage";
import Export from "../Tools/Export/Export";
import Build from "../Tools/Build/Build";
import AutoAssign from "../Tools/AutoAssign/AutoAssign";
import ClearFrames from "../Tools/ClearFrames/ClearFrames";
import StatusMessage from "./StatusMessage";

export default function Toolbar() {
  const animation = useContext(AnimationEditorContext)!;
  const tools = useContext(ToolsContext)!;

  const status = tools.status;
  const isIdle = status === "idle";
  const isSelecting = status === "selecting";
  const isBuilt = animation.isBuilt!;
  const hasAssets = Object.values(animation.assets!).length !== 0;
  const hasSelectedAssets = animation.selectedAssets?.length !== 0;
  const hasFilledFrames = animation.filledFrames!.size !== 0;

  return (
    <>
      <div className="z-1 flex items-center justify-center gap-4 bg-bg/40 py-[0.75rem] backdrop-blur-xl sm:gap-1 md:justify-between md:gap-0 md:px-8 md:py-6">
        <div className="flex items-center gap-4 sm:gap-2 md:w-1/3">
          <Upload isIdle={isIdle} />
          <Select isSelecting={isSelecting} hasAssets={hasAssets} />
          <Delete isSelecting={isSelecting} hasSelectedAssets={hasSelectedAssets} />
          <AutoAssign isIdle={isIdle} hasAssets={hasAssets} />
          <ClearFrames isIdle={isIdle} hasFilledFrames={hasFilledFrames} />
        </div>

        <StatusMessage />

        <div className="flex gap-4 sm:gap-2 md:w-1/3 md:justify-end">
          <Build isIdle={isIdle} />
          <Export isIdle={isIdle} isBuilt={isBuilt} />
        </div>
      </div>
    </>
  );
}
