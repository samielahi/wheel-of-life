import { useContext } from "react";
import { ToolbarContext, ToolbarDispatchContext } from "../../../../state/context";
import Modal from "../../../../core/Modal";
import Button from "../../../../core/Button";

export default function DeleteDialog() {
  const toolbar = useContext(ToolbarContext);
  const dispatchToolbarAction = useContext(ToolbarDispatchContext);

  function closeDeleteDialog() {
    if (toolbar.status === "deleting") {
      dispatchToolbarAction({
        type: "changeStatus",
        status: "selecting",
      });
    }
  }

  function deleteSelectedAssets() {
    

  }

  return (
    <>
      <Modal>
        <div className="wrapper flex flex-col justify-center gap-8">
          <span>Delete selected images?</span>
          <div>
            <Button>yes</Button>
            <Button onClick={closeDeleteDialog}>cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
