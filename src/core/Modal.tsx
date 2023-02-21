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
          <FocusTrap>
            <div>
              <div
                onClick={closeModal as () => void}
                className="bg-transparent z-9999 absolute top-0 left-0 h-screen w-screen bg-smoke/50"
              ></div>
              <div
                role="dialog"
                aria-labelledby="dialogTitle"
                aria-describedby="dialogDesc"
                className="expand z-9999 fixed p-6 left-[calc(50%_-_10rem)] top-[calc(50%_-_150px)] h-[350px] w-[20rem] rounded border-4 border-lightViolet  bg-active text-center text-sm drop-shadow-lg sm:left-[calc(50%_-_12rem)] sm:w-[24rem] md:left-[calc(50%_-_16rem)] md:h-[300px] md:w-[32rem] md:p-8 md:text-left lg:text-base"
              >
                {props.children}
              </div>
            </div>
          </FocusTrap>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
