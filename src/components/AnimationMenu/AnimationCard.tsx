import { memo } from "react";
import placeholderImage from "../../assets/file-image.svg";
import Input from "../../core/Input";

interface AnimationCardProps {
  animationId?: string;
  name?: string;
  thumbnail?: Blob | File;
}

function AnimationCard(props: AnimationCardProps) {
  // const thumbnailURL = URL.createObjectURL(props.thumbnail!);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 rounded border-[3px] border-smoke p-4">
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
