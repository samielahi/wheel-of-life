import { useContext } from "react";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarContext,
  ToolbarDispatchContext,
} from "../state/context";
import { AnimationDispatch, ToolbarDispatch } from "../types";
import Button from "../core/Button";
import IconButton from "../core/IconButton";

export default function Toolbar() {
  const animation = useContext(AnimationContext);
  const toolbar = useContext(ToolbarContext);
  const dispatchAnimationAction = useContext<AnimationDispatch>(
    AnimationDispatchContext
  );
  const dispatchToolbarAction = useContext<ToolbarDispatch>(
    ToolbarDispatchContext
  );

  const status = toolbar.status;
  const isIdle = status === "idle";
  const isSelecting = status === "selecting";
  const hasAssets = animation.assets;
  const hasSelectedAssets = animation.selectedAssets?.length !== 0;

  function toggleSelection() {
    if (isIdle && hasAssets) {
      dispatchToolbarAction({
        type: "startSelection",
      });

      dispatchToolbarAction({
        type: "tooltip",
        message: "Click any images below to select them.",
      });
    } else {
      dispatchToolbarAction({
        type: "endSelection",
      });

      dispatchAnimationAction({
        type: "deselectAll",
      });
    }
  }

  function deleteAssets() {
    if (isSelecting) {
      dispatchAnimationAction({
        type: "deleteAssets",
      });
    }
  }

  return (
    <>
      <div className="wrapper flex justify-center md:justify-between items-center gap-2 md:gap-0 border-smoke border-b-[3px]">
        <div className="flex gap-2 md:w-1/3">
          {/* Image Upload */}
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
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M12 12v6"></path>
              <path d="m15 15-3-3-3 3"></path>
            </svg>
          </IconButton>

          {/* Folder Upload */}
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
              <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
              <path d="M12 10v6"></path>
              <path d="m9 13 3-3 3 3"></path>
            </svg>
          </IconButton>

          {/* Image Selection Toggle */}
          <div className="flex gap-2">
            <Button
              onClick={toggleSelection}
              disabled={hasAssets ? false : true}
            >
              {isSelecting ? (
                <span className="text-red">cancel</span>
              ) : (
                <span>select images</span>
              )}
            </Button>
            <IconButton onClick={deleteAssets} disabled={!hasSelectedAssets}>
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
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </IconButton>
          </div>
        </div>

        {/* Toolbar Message, maybe should be own component */}
        <div className="hidden md:block bg-smoke rounded">
          {isSelecting ? <p className="px-4 py-2">{toolbar.message}</p> : null}
        </div>

        <div className="flex gap-2 md:w-1/3 md:justify-end">
          {/* Preview Animation */}
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
          {/* Export Toggle */}
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
          {/* Help Dialog Toggle */}
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
