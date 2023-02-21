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
        className="absolute left-[calc(100%_-_48px)] md:left-[calc(100%_-_60px)] h-[25px] w-[25px] top-5 md:top-4 z-10 rounded-full bg-yellow text-center text-sm text-black drop-shadow-sm focus:outline-2 focus:outline-offset-4 focus:outline-violet md:h-[40px] md:w-[40px] md:text-base"
      >
        {!props.isSelecting && hovered && props.hasAsset ? (
          <span className="flex cursor-pointer items-center justify-center rounded-full bg-orange md:h-[40px] md:w-[40px] ">
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
          <span className="flex cursor-auto items-center justify-center md:h-[40px] md:w-[40px]">
            {props.frameId + 1 <= 10 ? `0${props.frameId}` : `${props.frameId}`}
          </span>
        )}
      </button>
    </>
  );
}
