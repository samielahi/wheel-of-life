import { useContext } from "react";
import { ToolsDispatchContext } from "../../../state/context";

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
      <button
        onClick={toggleDeleteAnimationDialog}
        className="absolute top-3 left-[80%] z-10 cursor-pointer rounded-full bg-yellow p-2 text-gray focus:outline-2 focus:outline-offset-4 focus:outline-violet"
      >
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
      </button>
    </>
  );
}
