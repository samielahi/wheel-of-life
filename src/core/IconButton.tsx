import { ButtonProps } from "./Button";

export default function IconButton(props: ButtonProps) {
  return (
    <>
      <button
        disabled={props.disabled}
        onClick={props.onClick}
        style={props.disabled ? { color: "#D8D0D0" } : { color: "#9c8cdf" }}
        className="flex justify-center items-center rounded  hover:text-red bg-smoke w-[50px] h-[50px]"
      >
        {props.children}
      </button>
    </>
  );
}
