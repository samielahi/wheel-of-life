export interface ModalProps {
  closeModal?: () => void;
  children?: any;
}

export default function Modal(props: ModalProps) {
  return (
    <>
      <div
        onClick={props.closeModal}
        className=" bg-transparent fixed z-20 h-screen w-screen bg-smoke/50"
      ></div>
      <div className="absolute left-[calc(50%_-_16rem)] top-[calc(50%_-_150px)] z-30 h-[300px] w-[32rem] rounded bg-active drop-shadow-lg">
        {props.children}
      </div>
    </>
  );
}
