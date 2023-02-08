import Zoetrope from "./Zoetrope";
import Table from "./Table";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useControls } from "leva";
import jessica from "../../assets/example_strips/Jessica.png";

export default function Scene() {
  const { Speed, Strip } = useControls({
    Speed: { value: 0, min: 0, max: 0.05 },
    Strip: { options: { Jessica: jessica } },
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
