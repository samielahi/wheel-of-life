import useModal from "../../../../hooks/useModal";
import Modal from "../../../../core/Modal";
import Button from "../../../../core/Button";
import { Link } from "react-router-dom";

export default function BuildDialog(props: { name: string }) {
  const [isStatus, closeModal] = useModal("building");

  return (
    <>
      <Modal status="building">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <h3 className="text-xl">Animation strip <i className="text-orange">'{props.name}'</i> was successfully built!</h3>
          <p>You can now go play your animation in the 3D zoetrope.</p>
          <div className="flex gap-4">
            <Link
              className="flex w-fit items-center justify-center gap-2 rounded-md border-2 border-silver bg-white px-2 py-1 text-sm text-violet drop-shadow-sm hover:bg-smoke sm:px-4 sm:py-2 lg:h-[50px] lg:text-lg"
              to="/zoetrope"
            >
              go to zoetrope
            </Link>
            <Button onClick={closeModal as () => void}>cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
