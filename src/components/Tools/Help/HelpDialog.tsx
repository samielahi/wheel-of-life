import useModal from "../../../hooks/useModal";
import Button from "../../../core/Button";
import Modal from "../../../core/Modal";
import { useLocation } from "react-router";
import useLocalStorage from "../../../hooks/useLocalStorage";

interface HelpProps {
  show?: boolean;
  toggleShow?: (value: any) => void;
  closeModal: () => void;
}

const MenuHelpInfo = (props: HelpProps) => (
  <>
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h3 id="dialogTitle" className="text-center text-lg text-red md:text-3xl">
        Welcome!
      </h3>
      <p id="dialogDesc" className="leading-7">
        Create your own 16 frame animation strip that can be played on the 3D Zoetrope.
        Click{" "}
        <span className="rounded-md  border-2 border-silver bg-white px-2 py-1 drop-shadow-sm">
          create strip
        </span>{" "}
        , give your animation a name, and then click on the card to open the animation
        editor.
      </p>

      <div className="flex w-fit items-center justify-between gap-4">
        <Button onClick={props.closeModal}>cancel</Button>
        <div>
          <input
            onChange={() => props.toggleShow!(!props.show)}
            checked={!props.show}
            type="checkbox"
            name="suppress"
            id="suppress"
            className="mr-4"
          />
          <label htmlFor="suppress">Don't show again</label>
        </div>
      </div>
    </div>
  </>
);

const EditorHelpInfo = (props: HelpProps) => (
  <>
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h3 id="dialogTitle" className="text-center text-lg text-red md:text-3xl">
        Welcome!
      </h3>
      <p id="dialogDesc" className="leading-7">
        Make your animation here.
      </p>

      <div className="flex w-fit items-center justify-between gap-4">
        <Button onClick={props.closeModal}>cancel</Button>
      </div>
    </div>
  </>
);

export default function HelpDialog() {
  const [showDialog, setShowDialog] = useLocalStorage("showHelpDialog", true);
  const [isStatus, closeModal] = useModal("getting-help");
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <>
      <Modal status="getting-help">
        {pathname === "/animations" ? (
          <MenuHelpInfo
            show={showDialog}
            toggleShow={setShowDialog}
            closeModal={closeModal as () => void}
          />
        ) : (
          <EditorHelpInfo closeModal={closeModal as () => void} />
        )}
      </Modal>
    </>
  );
}
