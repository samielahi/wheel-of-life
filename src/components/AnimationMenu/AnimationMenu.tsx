import { useState, useEffect } from "react";
import { setFrame, setAnimation } from "../../state/idb";
import { AnimationStateDB, Asset, Frame } from "../../types";
import Header from "../../core/Header";
import AnimationCard from "./AnimationCard";
import AddAnimation from "./AddAnimation";
import { getAllAnimations } from "../../state/idb";

export default function AnimationMenu() {
  const [animations, setAnimations] = useState<AnimationStateDB[]>([]);

  useEffect(() => {
    async function loadAnimations() {
      const loadedAnimations = await getAllAnimations();
      setAnimations(loadedAnimations);
    }

    loadAnimations();
  });

  return (
    <>
      <Header type="menu"></Header>

      <div className="wrapper flex items-center gap-8">
        {animations.map((animation, i) => (
          <AnimationCard key={i} animationId={animation.id} name={animation.name} />
        ))}
        <AddAnimation />
      </div>
    </>
  );
}
