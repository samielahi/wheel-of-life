import { useContext } from "react";
import { AnimationMenuContext } from "../../state/context";
import AnimationCard from "./AnimationCard";

export default function AnimationCards() {
  const animationMenu = useContext(AnimationMenuContext)!;

  return (
    <>
      {animationMenu.length !== 0 ? (
        <div className="wrapper my-4 flex flex-wrap justify-center gap-8 overflow-auto md:justify-start">
          {animationMenu.map((animation, i) => (
            <AnimationCard
              key={i}
              name={animation.name}
              animationId={animation.id}
              thumbnail={animation.thumbnail}
            />
          ))}
        </div>
      ) : (
        <div className="wrapper flex h-full w-full items-center justify-center">
          <span className="flex gap-2 rounded-md border-2 border-dashed border-lightViolet bg-white p-10 text-xl italic">
            Create
            <span className="text-violet">
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
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </span>
            an animation to get started.
          </span>
        </div>
      )}
    </>
  );
}
