import { memo } from "react";
import placeholderImage from "../../assets/icons/file-image.svg";
import Input from "../../core/Input";
import DeleteAnimation from "../Tools/DeleteAnimation/DeleteAnimation";
import { Link } from "react-router-dom";

interface AnimationCardProps {
  animationId?: string;
  name?: string;
  thumbnail?: Blob | File | undefined;
}

function AnimationCard(props: AnimationCardProps) {
  let thumbnailURL: string | undefined = undefined;

  if (props.thumbnail) {
    thumbnailURL = URL.createObjectURL(props.thumbnail);
  }

  return (
    <>
      <div
        tabIndex={0}
        className="group relative rounded border-2 border-silver bg-white p-4 drop-shadow-sm hover:border-violet focus:outline-none focus:ring-2 focus:ring-orange"
      >
        <DeleteAnimation animationId={props.animationId!} />

        <div className="h-[300px] w-[225px]">
          <Link
            tabIndex={0}
            to={`/animation-editor/${props.name}`}
            state={{ animationId: props.animationId }}
          >
            <img
              tabIndex={-1}
              className="h-full w-full cursor-pointer opacity-75 "
              src={thumbnailURL || placeholderImage}
              alt="animation thumbnail placeholder"
            />
          </Link>
        </div>
        <Input name={props.name} animationId={props.animationId} />
      </div>
    </>
  );
}

export default memo(AnimationCard);
