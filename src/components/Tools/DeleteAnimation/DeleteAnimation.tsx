import { useContext } from "react";
import { ToolsDispatchContext } from "../../../state/context";
import DeleteAnimationDialog from "./DeleteAnimationDialog";

export default function DeleteAnimation(props: { animationId: string }) {
  const dispatchToolsAction = useContext(ToolsDispatchContext)!;

  function toggleDeleteAnimationDialog() {
    dispatchToolsAction({
      type: "STATUS_CHANGE",
      newStatus: "deletingAnimation",
      animationId: props.animationId,
    });
  }

  return (
    <>
      <span
        onClick={toggleDeleteAnimationDialog}
        className="invisible absolute top-3 left-[80%] z-10 rounded-full bg-orange p-2 group-hover:visible "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </span>
    </>
  );
}
