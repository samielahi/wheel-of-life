import { useContext } from "react";
import { AnimationContext, ToolbarContext } from "../../state/context";
import IconButton from "../../core/IconButton";
import AssetUpload from "./Tools/AssetUpload";
import Select from "./Tools/Select";
import DeleteSelection from "./Tools/DeleteSelection";
import StatusMessage from "./StatusMessage";

export default function Toolbar() {
  const animation = useContext(AnimationContext);
  const toolbar = useContext(ToolbarContext);

  const status = toolbar.status;
  const statusMessage = toolbar.message;
  const isIdle = status === "idle";
  const isSelecting = status === "selecting";
  const hasAssets = Object.values(animation.assets!).length !== 0;
  const hasSelectedAssets = animation.selectedAssets?.length !== 0;

  return (
    <>
      <div className="wrapper flex justify-center md:justify-between items-center gap-2 md:gap-0 border-smoke border-b-[3px]">
        <div className="flex gap-2 md:w-1/3">
          <AssetUpload isIdle={isIdle} />

          <Select
            isSelecting={isSelecting}
            hasAssets={hasAssets}
            isIdle={isIdle}
          />

          <DeleteSelection
            isSelecting={isSelecting}
            hasSelectedAssets={hasSelectedAssets}
          />
        </div>

        <StatusMessage isSelecting={isSelecting} message={statusMessage!} />

        <div className="flex gap-2 md:w-1/3 md:justify-end">
          <IconButton disabled={!isIdle}>
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
              <path d="M5 12s2.545-5 7-5c4.454 0 7 5 7 5s-2.546 5-7 5c-4.455 0-7-5-7-5z"></path>
              <path d="M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
              <path d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"></path>
              <path d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"></path>
            </svg>
          </IconButton>
          <IconButton disabled={!isIdle}>
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
          </IconButton>
          <IconButton disabled={!isIdle}>
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
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </IconButton>
        </div>
      </div>
    </>
  );
}
