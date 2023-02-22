import { FormEvent, MouseEvent } from "react";

interface ControlsProps {
  changeSpeed?: (e: FormEvent<HTMLInputElement>) => void;
  selectStrip?: (e: MouseEvent) => void;
  animations?: Record<string, string>;
}

export default function Controls(props: ControlsProps) {
  return (
    <>
      <div className="absolute left-[calc(100%_-_250px_-_5%)] top-[78%] lg:top-[70%] z-20  h-max w-[250px] rounded-md bg-silver p-6 text-center text-lg drop-shadow-md backdrop-blur-3xl ">
        <div className="flex flex-col gap-4">
          <label htmlFor="speed-select">
            <h3 className="text-sm text-red lg:text-base">Set spin speed :</h3>
          </label>
          <input
            id="speed-select"
            type="range"
            min="0"
            max="0.05"
            step="0.01"
            onChange={props.changeSpeed}
          />
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <label htmlFor="strip-select">
            <h3 className="text-sm text-violet lg:text-base">Choose a strip :</h3>
          </label>
          <select
            name="strips"
            id="strip-select"
            className="cursor-pointer rounded bg-white p-2 text-sm lg:text-base"
            onClick={props.selectStrip}
          >
            {Object.entries(props.animations!).map((animation, i) => (
              <option key={i} value={animation[1]}>
                {animation[0]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
