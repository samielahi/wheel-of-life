import Zoetrope from "./Zoetrope";
import Table from "./Table";
import { OrbitControls, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, FormEvent, MouseEvent } from "react";
import empty from "../../assets/example_strips/empty.png";
import { useState } from "react";
import { blobToDataURL } from "../../utils";
import { getAllAnimations } from "../../state/idb";

export default function Scene() {
  const [animations, setAnimations] = useState<Record<string, string>>({});
  const [speed, setSpeed] = useState(0);
  const [currentStrip, setCurrentStrip] = useState(empty);

  function changeZoetropeSpinSpeed(e: FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    const speed = parseFloat(target.value);
    setSpeed(speed);
  }

  function selectStrip(e: MouseEvent) {
    const target = e.target as HTMLOptionElement;
    const strip = target.value;
    setCurrentStrip(strip);
  }

  useEffect(() => {
    async function loadAnimations() {
      const animationDataURLs: Record<string, string> = {};

      for (const animation of await getAllAnimations()) {
        const name = animation.name!;
        const blob = animation.build!;
        const dataURL = await blobToDataURL(blob);
        animationDataURLs[name] = dataURL;
      }
      setAnimations(animationDataURLs);
    }
    loadAnimations();
  }, []);

  return (
    <>
      <div className="absolute left-[90%] top-8 z-20 flex h-max w-max flex-col gap-2 rounded bg-smoke p-4 drop-shadow-sm">
        <div className="flex flex-col gap-2">
          <label htmlFor="speed-select">Set spin speed :</label>
          <input
            id="speed-select"
            type="range"
            min="0"
            max="0.05"
            step="0.01"
            onChange={changeZoetropeSpinSpeed}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="strip-select">Choose a strip : </label>
          <select
            name="strips"
            id="strip-select"
            className="cursor-pointer"
            onClick={selectStrip}
          >
            <option defaultValue={empty}>--select strip--</option>
            {Object.entries(animations).map((animation, i) => (
              <option key={i} value={animation[1]}>
                {animation[0]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Canvas className="z-1 h-full w-full bg-active" camera={{ position: [10, 5, 3] }}>
        <ambientLight intensity={0.5} />
        <Suspense>
          <OrbitControls
            maxDistance={8}
            minDistance={2}
            minAzimuthAngle={0}
            maxAzimuthAngle={0}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.5}
          />
          <Zoetrope speed={speed} image={currentStrip} />
          <Table />
        </Suspense>
      </Canvas>
    </>
  );
}
