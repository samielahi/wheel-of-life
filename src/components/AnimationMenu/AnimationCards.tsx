import { useContext } from "react";
import { AnimationMenuContext } from "../../state/context";
import AnimationCard from "./AnimationCard";

export default function AnimationCards() {
  const animationMenu = useContext(AnimationMenuContext)!;

  return (
    <>
      {animationMenu.animations && animationMenu.animations.length ? (
        <div className="wrapper flex gap-4">
          {animationMenu.animations.map((animation, i) => (
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
