import { useContext } from "react";
import { AnimationMenuContext } from "../../state/context";
import AnimationCard from "./AnimationCard";

export default function AnimationCards() {
  const animationMenu = useContext(AnimationMenuContext)!;

  return (
    <>
      <div className="wrapper flex gap-4">
        {animationMenu.map((animation, i) => (
          <AnimationCard
            key={i}
            name={animation.name}
            animationId={animation.id}
            thumbnail={animation.thumbnail}
          />
        ))}
      </div>
    </>
  );
}
