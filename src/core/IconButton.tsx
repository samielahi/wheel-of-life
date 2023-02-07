import { ButtonProps } from "./Button";
import { useState } from "react";

export default function IconButton(props: ButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <>
      <div>
        <button
          disabled={props.disabled}
          style={props.disabled ? { color: "#D8D0D0" } : { color: "#9c8cdf" }}
          className="flex h-[35px] w-[35px] items-center justify-center rounded bg-smoke hover:text-red sm:p-0 lg:h-[50px] lg:w-[50px]"
          onClick={props.onClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
        >
          {props.children}
        </button>

        {showTooltip ? (
          <div className="invisible absolute z-30 text-center italic text-white drop-shadow-sm sm:visible">
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
