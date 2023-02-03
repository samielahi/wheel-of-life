import { useState, useContext } from "react";
import { AnimationContext, AnimationDispatchContext } from "../state/context";
import IconButton from "./IconButton";

export interface InputProps {
  name?: string;
}

const Name = (props: { name: string; onClick?: () => void }) => (
  <>
    <div className="flex w-[20ch] items-center justify-between gap-4 rounded bg-smoke p-2">
      <p>{props.name}</p>
      <span onClick={props.onClick} className="w-[20px] cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="2" x2="22" y2="6"></line>
          <path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path>
        </svg>
      </span>
    </div>
  </>
);

export default function Input(props: InputProps) {
  const [value, setValue] = useState(props.name);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {!isEditing ? (
        <Name name={value!} onClick={() => setIsEditing(true)} />
      ) : (
        <input
          className="w-[20ch] p-2"
          type="text"
          autoFocus
          placeholder="Name your strip..."
          value={value}
          maxLength={20}
          onChange={(event) => {
            setValue(event.target.value);
          }}
          onKeyUp={(event) => {
            if (event.key === "Enter") {
              setIsEditing(false);
            }
          }}
        />
      )}
    </>
  );
}