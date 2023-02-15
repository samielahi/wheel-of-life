import { useContext } from "react";
import { AnimationEditorDispatchContext } from "../../../state/context";
import Modal from "../../../core/Modal";
import Button from "../../../core/Button";
import useModal from "../../../hooks/useModal";

export default function AutoAssignDialog() {
  const [isStatus, closeModal] = useModal("auto-assigning");
  const dispatchEditorAction = useContext(AnimationEditorDispatchContext)!;

  function autoAssign() {
    if (isStatus) {
      dispatchEditorAction({
        type: "AUTO_ASSIGN",
      });

      (closeModal as () => void)();
    }
  }

  return (
    <>
      <Modal status="auto-assigning">
        <div className="wrapper flex h-full flex-col items-center justify-center gap-8">
          <h3 className="text-2xl text-orange">Auto assign images to frames?</h3>
          <span className="text-center italic">
            Images assigned until all frames are filled (in alphanumerical order by file
            name) and will replace images that are currently assigned.
          </span>
          <div className="flex gap-4">
            <Button onClick={autoAssign}>confirm</Button>
            <Button onClick={closeModal as () => void}>cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
