import { ButtonProps } from "./Button";
import { useRef, useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export default function IconButton(props: ButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [animationParent] = useAutoAnimate();

  return (
    <>
      <div ref={animationParent}>
        <button
          disabled={props.disabled}
          style={props.disabled ? { color: "#D8D0D0" } : { color: "#9c8cdf" }}
          className="flex h-[50px] w-[50px] items-center justify-center rounded  bg-smoke duration-300 ease-in-out hover:text-red"
          onClick={props.onClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        >
          {props.children}
        </button>

        {showTooltip ? (
          <div className="absolute z-30 text-center italic text-white drop-shadow-sm">
            <span
              className={`absolute top-2
             rounded bg-gray p-2 text-sm`}
            >
              {props.tooltip}
            </span>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
