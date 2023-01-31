import { ButtonProps } from "./Button";

export default function IconButton(props: ButtonProps) {
  return (
    <>
      <button
        disabled={props.disabled}
        onClick={props.onClick}
        style={props.disabled ? { color: "#D8D0D0" } : { color: "#9c8cdf" }}
        className="flex h-[50px] w-[50px] items-center justify-center rounded  bg-smoke duration-300 ease-in-out hover:text-red"
      >
        {props.children}
      </button>
    </>
  );
}
