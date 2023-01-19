import { MouseEvent } from "react";

export interface ButtonProps {
  onClick?: (e: MouseEvent) => void;
  children?: any;
  disabled?: boolean;
}

export default function Button(props: ButtonProps) {
  return (
    <>
      <button
        disabled={props.disabled}
        onClick={props.onClick}
        className="flex justify-center items-center gap-2 border-0 rounded bg-smoke px-4 py-2 lg:text-lg hover:text-red "
      >
        {props.children}
      </button>
    </>
  );
}
