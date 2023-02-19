import { useState } from "react";

interface FrameCountProps {
  frameId: number;
  onClick?: () => void;
  hasAsset?: boolean | any;
  isSelecting?: boolean;
}

export default function FrameCount(props: FrameCountProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <>
      <button
        tabIndex={props.hasAsset && !props.isSelecting ? 0 : -1}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => {
          if (props.hasAsset) {
            setHovered(true);
          }
        }}
        onBlur={() => setHovered(false)}
        onClick={() => {
          if (props.hasAsset && !props.isSelecting) {
            props.onClick!();
          }
        }}
        className="text-md absolute left-[calc(100%_-_60px)] top-4 z-10 h-[40px] w-[40px] rounded-full bg-yellow text-center text-black drop-shadow-sm focus:outline-2 focus:outline-offset-4 focus:outline-violet"
      >
        {!props.isSelecting && hovered && props.hasAsset ? (
          <span className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-orange ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </span>
        ) : (
          <span className="flex h-[40px] w-[40px] cursor-auto items-center justify-center">
            {props.frameId + 1 <= 10 ? `0${props.frameId}` : `${props.frameId}`}
          </span>
        )}
      </button>
    </>
  );
}
