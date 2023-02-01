import { useContext } from "react";
import { AnimationContext, ToolbarContext } from "../../state/context";
import Upload from "./Tools/Upload";
import Select from "./Tools/Select";
import Delete from "./Tools/Delete/Delete";
import Export from "./Tools/Export/Export";
import Build from "./Tools/Build/Build";
import AutoAssign from "./Tools/AutoAssign/AutoAssign";
import StatusMessage from "./StatusMessage";

export default function Toolbar() {
  const animation = useContext(AnimationContext);
  const toolbar = useContext(ToolbarContext);

  const status = toolbar.status;
  const statusMessage = toolbar.message;
  const isIdle = status === "idle";
  const isSelecting = status === "selecting";
  const isBuilt = animation.isBuilt;
  const hasAssets = Object.values(animation.assets!).length !== 0;
  const hasSelectedAssets = animation.selectedAssets?.length !== 0;

  return (
    <>
      <div className="wrapper flex items-center justify-center gap-2 border-b-[3px] border-t-[3px] border-smoke md:justify-between md:gap-0">
        <div className="flex gap-2 md:w-1/3">
          <Upload isIdle={isIdle} />

          <AutoAssign isIdle={isIdle} hasAssets={hasAssets} />

          <Select
            isSelecting={isSelecting}
            hasAssets={hasAssets}
            isIdle={isIdle}
          />

          <Delete
            isSelecting={isSelecting}
            hasSelectedAssets={hasSelectedAssets}
          />
        </div>

        <StatusMessage isSelecting={isSelecting} message={statusMessage!} />

        <div className="flex gap-2 md:w-1/3 md:justify-end">
          <Build />
          <Export isIdle={isIdle} isBuilt={isBuilt} />
        </div>
      </div>
    </>
  );
}
