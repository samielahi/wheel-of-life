import useModal from "../hooks/useModal";
import { ToolsStatus } from "../types";
import FocusTrap from "focus-trap-react";

export interface ModalProps {
  status?: ToolsStatus;
  children?: any;
}

export default function Modal(props: ModalProps) {
  const [isStatus, closeModal] = useModal(props.status!);

  return (
    <>
      {isStatus ? (
        <>
          <div
            onClick={closeModal as () => void}
            className="bg-transparent z-9999 absolute top-0 left-0 h-screen w-screen bg-smoke/50"
          ></div>
          <FocusTrap>
            <div
              role="dialog"
              aria-labelledby="dialogTitle"
              aria-describedby="dialogDesc"
              className="expand z-9999 fixed left-[calc(50%_-_16rem)] top-[calc(50%_-_150px)] h-[300px] w-[32rem] rounded border-4 border-lightViolet bg-active p-8 drop-shadow-lg"
            >
              {props.children}
            </div>
          </FocusTrap>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
