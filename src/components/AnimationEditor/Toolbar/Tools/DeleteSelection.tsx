import { useContext } from "react";
import {
  AnimationContext,
  AnimationDispatchContext,
  ToolbarDispatchContext,
} from "../../../../state/context";
import { AnimationDispatch, ToolbarDispatch } from "../../../../types";
import IconButton from "../../../../core/IconButton";

export default function DeleteSelection(props: {
  isSelecting: boolean;
  hasSelectedAssets: boolean;
}) {
  const animation = useContext(AnimationContext);
  const dispatchAnimationAction = useContext<AnimationDispatch>(
    AnimationDispatchContext
  );
  const dispatchToolbarAction = useContext<ToolbarDispatch>(
    ToolbarDispatchContext
  );

  function deleteAssets() {
    if (props.isSelecting) {
      dispatchAnimationAction({
        type: "deleteAssets",
      });
    }

    // If there are no more assets left after deletion, end selection session
    const hasNoAssets = Object.values(animation.assets!).length !== 0;

    if (hasNoAssets) {
      dispatchToolbarAction({
        type: "endSelection",
      });
    }
  }

  return (
    <>
      <IconButton onClick={deleteAssets} disabled={!props.hasSelectedAssets}>
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
    </>
  );
}
