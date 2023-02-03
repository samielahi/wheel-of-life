import { useState, useEffect, memo } from "react";
import { getAllAssets } from "../../state/idb";
import Input from "../../core/Input";

interface AnimationCardProps {
  animationId?: string;
  name?: string;
  thumbnail?: Blob | File;
}

function AnimationCard(props: AnimationCardProps) {
  const [thumbnailURL, setThumbnailURL] = useState<string | null>(null);

  useEffect(() => {
    async function getThumbnail() {
      const assets = await getAllAssets(props.animationId!);
      const url = URL.createObjectURL(assets[0].data!);
      setThumbnailURL(url);
    }

    getThumbnail();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 rounded border-[3px] border-smoke p-4">
        <div className="h-[300px] w-[225px]">
          <img
            className="h-full w-full opacity-75"
            src={thumbnailURL! || "http://placekitten.com/300/400"}
            alt="animation thumbnail placeholder"
          />
        </div>
        <Input name={props.name} />
      </div>
    </>
  );
}

export default memo(AnimationCard);
