export interface ModalProps {
  closeModal?: () => void;
  children?: any;
}

export default function Modal(props: ModalProps) {
  return (
    <>
      <div
        onClick={props.closeModal}
        className=" bg-smoke/50 w-screen h-screen z-20 bg-transparent fixed"
      >
        <div className="drop-shadow-lg absolute w-[30rem] h-[300px] bg-active rounded left-[calc(50%_-_15rem)] top-[calc(50%_-_150px)]">
          {props.children}
        </div>
      </div>
    </>
  );
}
