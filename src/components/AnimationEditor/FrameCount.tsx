import { useState } from "react";

interface FrameCountProps {
  frameId: number;
  onClick?: () => void;
  hasAsset?: boolean | any;
}

export default function FrameCount(props: FrameCountProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
          if (props.hasAsset) props.onClick!();
        }}
        className="text-md absolute left-[calc(100%_-_60px)] top-4 z-10 h-[40px] w-[40px] rounded-full bg-yellow text-center text-gray drop-shadow-sm"
      >
        {hovered && props.hasAsset ? (
          <span className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-orange">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        ) : (
          <span className="flex h-[40px] w-[40px] items-center justify-center">
            {props.frameId + 1 <= 10 ? `0${props.frameId}` : `${props.frameId}`}
          </span>
        )}
      </div>
    </>
  );
}
