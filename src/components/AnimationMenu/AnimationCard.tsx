import { memo } from "react";
import placeholderImage from "../../assets/icons/file-image.svg";
import Input from "../../core/Input";
import DeleteAnimation from "../Tools/DeleteAnimation/DeleteAnimation";
import { Link } from "react-router-dom";

interface AnimationCardProps {
  animationId?: string;
  name?: string;
  thumbnail?: Blob | File | undefined;
  style?: any;
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
        className="expand group relative origin-center rounded border-4 border-silver bg-white p-4 drop-shadow-sm hover:border-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-4"
      >
        <DeleteAnimation animationId={props.animationId!} />

        <div className="h-[300px] w-[225px]">
          <Link
            tabIndex={0}
            to={`/animation-editor/${props.name}`}
            state={{ animationId: props.animationId }}
            className="rounded focus:outline-2 focus:outline-orange"
          >
            <img
              tabIndex={-1}
              className="h-full w-full cursor-pointer opacity-75"
              src={thumbnailURL || placeholderImage}
              alt={`Thumbnail for the animation ${props.name}`}
            />
          </Link>
        </div>
        <div className="ml-5 w-full">
          <Input name={props.name} animationId={props.animationId} />
        </div>
      </div>
    </>
  );
}

export default memo(AnimationCard);
