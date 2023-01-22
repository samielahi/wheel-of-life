import { ButtonProps } from "./Button";

export default function IconButton(props: ButtonProps) {
  return (
    <>
      <button
        disabled={props.disabled}
        onClick={props.onClick}
        className="flex justify-center items-center rounded text-violet hover:text-red bg-smoke w-[50px] h-[50px]"
      >
        {props.children}
      </button>
    </>
  );
}
