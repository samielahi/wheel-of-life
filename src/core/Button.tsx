import { MouseEvent } from "react";

export interface ButtonProps {
  onClick?: (e: MouseEvent) => void;
  children?: any;
  disabled?: boolean;
  tooltip?: string;
  role?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <>
      <button
        disabled={props.disabled}
        onClick={props.onClick}
        style={props.disabled ? { color: "#D8D0D0", pointerEvents: "none" } : {}}
        className="flex items-center justify-center gap-2 rounded-md border-2 border-silver bg-white px-2 py-1 text-sm text-black drop-shadow-sm backdrop-blur-lg hover:border-violet hover:bg-smoke/10 focus:outline-2 focus:outline-offset-4 focus:outline-violet sm:px-4 sm:py-2 lg:h-[50px] lg:text-lg"
      >
        {props.children}
      </button>
    </>
  );
}
