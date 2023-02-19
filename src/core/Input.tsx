import { useState, useContext } from "react";
import { AnimationMenuDispatchContext } from "../state/context";

export interface InputProps {
  name?: string;
  animationId?: string;
}

const Name = (props: { name: string; onClick?: () => void }) => (
  <>
    <div className="flex w-[20ch] items-center justify-between gap-4 rounded bg-smoke p-2">
      <p>{props.name}</p>
      <span
        tabIndex={0}
        onClick={props.onClick}
        onKeyUp={(event) => {
          if (event.key === "Enter") {
            props.onClick!();
          }
        }}
        className="w-[20px] cursor-pointer rounded  focus:outline-2 focus:outline-offset-4 focus:outline-violet"
      >
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
  const dispatch = useContext(AnimationMenuDispatchContext)!;

  function confirmNameChange() {
    dispatch({
      type: "NAME_CHANGE",
      name: value!,
      animationId: props.animationId!,
    });
  }

  return (
    <>
      {!isEditing ? (
        <Name name={value!} onClick={() => setIsEditing(true)} />
      ) : (
        <div className="flex w-fit items-center gap-2 rounded bg-smoke">
          <input
            className="w-[15ch] rounded border-2 border-smoke p-2 italic focus:outline-2 focus:outline-violet"
            type="text"
            autoFocus
            placeholder="Name your strip..."
            value={value}
            maxLength={15}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                confirmNameChange();
                setIsEditing(false);
              }
            }}
          />
          <span
            tabIndex={0}
            className="flex w-[5ch] cursor-pointer items-center justify-center"
            onClick={() => {
              confirmNameChange();
              setIsEditing(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A6C2A1"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </span>
        </div>
      )}
    </>
  );
}
