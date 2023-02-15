import { useContext } from "react";
import { AnimationMenuContext } from "../../state/context";
import AnimationCard from "./AnimationCard";

export default function AnimationCards() {
  const animationMenu = useContext(AnimationMenuContext)!;

  return (
    <>
      {animationMenu.length !== 0 ? (
        <div className="wrapper flex gap-4 mt-4">
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
        <p className="wrapper">Add an animation to get started.</p>
      )}
    </>
  );
}
