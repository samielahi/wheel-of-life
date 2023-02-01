import { MouseEvent } from "react";

export interface ButtonProps {
  onClick?: (e: MouseEvent) => void;
  children?: any;
  disabled?: boolean;
  tooltip?: string;
}

export default function Button(props: ButtonProps) {
  return (
    <>
      <button
        disabled={props.disabled}
        onClick={props.onClick}
        style={props.disabled ? { color: "#D8D0D0" } : {}}
        className="flex items-center justify-center gap-2 rounded border-0 bg-smoke px-4 py-2 lg:text-lg"
      >
        {props.children}
      </button>
    </>
  );
}
