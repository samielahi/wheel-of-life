import { useState, useContext, MouseEvent } from "react";
import { AnimationMenuContext, AnimationMenuDispatchContext } from "../../state/context";
import Modal from "../../core/Modal";
import Button from "../../core/Button";

export default function DeleteAnimation(props: { animationId: string }) {
  const dispatch = useContext(AnimationMenuDispatchContext);
  const [isDeletingAnimation, setIsDeletingAnimation] = useState(false);

  function deleteAnimation(e: MouseEvent) {
    e.preventDefault();
    dispatch({
      type: "DELETE_ANIMATION",
      animationId: props.animationId,
    });

    setIsDeletingAnimation(false);
  }

  return (
    <>
      {isDeletingAnimation ? (
        <Modal closeModal={() => setIsDeletingAnimation(false)}>
          <div className="flex h-full flex-col items-center justify-center gap-4">
            <h3>Delete Animation?</h3>
            <div className="flex gap-4">
              <Button onClick={deleteAnimation}>confirm</Button>
              <Button onClick={() => setIsDeletingAnimation(false)}>cancel</Button>
            </div>
          </div>
        </Modal>
      ) : null}

      <span
        onClick={() => setIsDeletingAnimation(true)}
        className="invisible absolute top-3 left-[80%] z-10 rounded-full bg-smoke p-2 group-hover:visible "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ff3d00"
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
