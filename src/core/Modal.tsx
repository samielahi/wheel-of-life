import useModal from "../hooks/useModal";
import { ToolsStatus } from "../types";

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
          <div className="expand z-9999 fixed left-[calc(50%_-_300px)] top-[calc(50%_-_10rem)] h-[300px] w-[32rem] rounded bg-active p-8 drop-shadow-lg">
            {props.children}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
