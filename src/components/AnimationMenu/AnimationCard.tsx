import { memo } from "react";
import placeholderImage from "../../assets/icons/file-image.svg";
import Input from "../../core/Input";
import DeleteAnimation from "./DeleteAnimation";
import { Link } from "react-router-dom";

interface AnimationCardProps {
  animationId?: string;
  name?: string;
  thumbnail?: Blob | File;
}

function AnimationCard(props: AnimationCardProps) {
  return (
    <>
      <div className="group relative cursor-pointer rounded border-[3px] border-smoke p-4 hover:border-violet">
        <DeleteAnimation animationId={props.animationId!} />

        <div className="h-[300px] w-[225px]">
          <Link
            to={`/animation-editor/${props.name}`}
            state={{ animationId: props.animationId }}
          >
            <img
              className="h-full w-full opacity-75"
              src={placeholderImage}
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
