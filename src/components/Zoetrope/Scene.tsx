import Zoetrope from "./Zoetrope";
import Table from "./Table";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { useControls } from "leva";
import jessica from "../../assets/example_strips/Jessica.png";
import { useState } from "react";
import { AnimationStateDB } from "../../types";
import { getAllAnimations } from "../../state/idb";

export default function Scene() {
  const [animations, setAnimations] = useState<Record<string, string>>({});

  useEffect(() => {
    async function loadAnimations() {
      const loadedAnimations = await getAllAnimations();
      const animationImageURLs: Record<string, string> = {};
      loadedAnimations.forEach((animation) => {
        const name = animation.name!;
        const objectURL = URL.createObjectURL(animation.build!);

        animationImageURLs[name] = objectURL;
      });

      setAnimations(animationImageURLs);
    }

    loadAnimations();
  }, []);

  const { Speed, Strip } = useControls({
    Speed: { value: 0, min: 0, max: 0.05 },
    Strip: { options: { Jessica: jessica, ...animations } },
  });

  return (
    <Canvas className="h-full w-full" camera={{ position: [10, 5, 3] }}>
      <Suspense>
        <ambientLight intensity={0.7} />
        <OrbitControls
          maxDistance={8}
          minDistance={2}
          minAzimuthAngle={0}
          maxAzimuthAngle={0}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.5}
        />
        <Zoetrope speed={Speed} image={Strip} />
        <Table />
      </Suspense>
    </Canvas>
  );
}
