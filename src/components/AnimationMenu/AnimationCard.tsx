import { memo } from "react";
import placeholderImage from "../../assets/file-image.svg";
import Input from "../../core/Input";
import DeleteAnimation from "./DeleteAnimation";

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
          <img
            className="h-full w-full opacity-75"
            src={placeholderImage}
            alt="animation thumbnail placeholder"
          />
        </div>
        <Input name={props.name} animationId={props.animationId} />
      </div>
    </>
  );
}

export default memo(AnimationCard);
