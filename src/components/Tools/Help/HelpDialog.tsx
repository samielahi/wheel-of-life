import { useContext } from "react";
import useModal from "../../../hooks/useModal";
import Button from "../../../core/Button";
import Modal from "../../../core/Modal";
import { useLocation } from "react-router";
import useLocalStorage from "../../../hooks/useLocalStorage";

interface HelpProps {
  show: boolean;
  toggleShow: (value: any) => void;
  closeModal: () => void;
}

const MenuHelpInfo = (props: HelpProps) => (
  <>
    <div className="flex flex-col items-center justify-center gap-4">
      <h3 className="text-2xl text-red">Welcome To The Strip Editor!</h3>
      <span>
        Here you can create your own 16 frame animation strip that can be played on the 3D
        zoetrope.
      </span>
      <div>
        <input
          onChange={() => props.toggleShow(!props.show)}
          checked={!props.show}
          type="checkbox"
          name="suppress"
          id="suppress"
          className="mr-4"
        />
        <label htmlFor="suppress">Don't show again</label>
      </div>
      <Button onClick={props.closeModal}>cancel</Button>
    </div>
  </>
);

const EditorHelpInfo = () => <></>;

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
          <EditorHelpInfo />
        )}
      </Modal>
    </>
  );
}
