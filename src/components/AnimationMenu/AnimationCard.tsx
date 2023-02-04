import { memo } from "react";
import placeholderImage from "../../assets/file-image.svg";
import IconButton from "../../core/IconButton";
import Input from "../../core/Input";
import { deleteAnimation } from "../../state/idb";

interface AnimationCardProps {
  animationId?: string;
  name?: string;
  thumbnail?: Blob | File;
}

function AnimationCard(props: AnimationCardProps) {

  return (
    <>
      <div className="group relative cursor-pointer rounded border-[3px] border-smoke p-4 hover:border-violet">
        <span className="invisible absolute top-3 left-[80%] rounded-full bg-smoke p-2 group-hover:visible ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ff3d00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </span>

        <div className="h-[300px] w-[225px]">
          <img
            className="h-full w-full opacity-75"
            src={placeholderImage}
            alt="animation thumbnail placeholder"
          />
        </div>
        <Input name={props.name} />
      </div>
    </>
  );
}

export default memo(AnimationCard);
