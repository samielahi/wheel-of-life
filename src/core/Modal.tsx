export interface ModalProps {
  isOpen?: boolean;
  closeModal?: () => void;
  children?: any;
}

export default function Modal(props: ModalProps) {
  return (
    <>
      <div
        onClick={props.closeModal}
        style={props.isOpen ? {} : { display: "none" }}
        className=" bg-smoke/50 w-screen h-screen z-20 bg-transparent fixed"
      >
        <div className="drop-shadow-lg absolute w-[40rem] h-[400px] bg-active rounded left-[calc(50%_-_20rem)] top-[calc(50%_-_200px)]">
          {props.children}
        </div>
      </div>
    </>
  );
}
