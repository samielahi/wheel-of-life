import Zoetrope from "./Zoetrope";
import Table from "./Table";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, FormEvent, MouseEvent } from "react";
import { useState } from "react";
import { blobToDataURL } from "../../utils";
import { getAllAnimations } from "../../state/idb";
import Strip from "./Strip/Strip";
import Footer from "../../core/Footer";
import Controls from "./Controls";

export default function Scene() {
  const [animations, setAnimations] = useState<Record<string, string>>({});
  const [speed, setSpeed] = useState(0);
  const [currentStrip, setCurrentStrip] = useState("/strips/Jessica.png");

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
      const animationDataURLs: Record<string, string> = { Jessica: "/Jessica.png" };

      for (const animation of await getAllAnimations()) {
        const name = animation.name!;
        const blob = animation.build!;
        if (blob) {
          const dataURL = await blobToDataURL(blob);
          animationDataURLs[name] = dataURL;
        }
      }
      setAnimations(animationDataURLs);
    }
    loadAnimations();
  }, []);

  return (
    <>
      <div className="fixed z-20 w-full">
        <div className="flex items-center justify-center bg-bg/40 py-10 backdrop-blur-2xl">
          <h1 className="text-5xl text-red">Wheel Of Life</h1>
        </div>
      </div>

      <div className="absolute left-[5%] top-[75%] z-20 rounded-md bg-yellow/40 p-6 backdrop-blur">
        <h3 className="text-lg text-red">Now Playing:</h3>
        <p className="italic">Jessica Campbell</p>
      </div>

      <Controls
        changeSpeed={changeZoetropeSpinSpeed}
        selectStrip={selectStrip}
        animations={animations}
      ></Controls>

      <Canvas shadows camera={{ position: [0, 10, 10], fov: 80 }}>
        <OrbitControls
          maxDistance={8}
          minDistance={2}
          minAzimuthAngle={0}
          maxAzimuthAngle={0}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2.5}
        />
        <Suspense>
          <Stage
            adjustCamera={false}
            intensity={0.4}
            shadows={{ type: "accumulative", color: "gray", colorBlend: 1, opacity: 0.4 }}
            // @ts-ignore
            environment={null}
            preset="rembrandt"
          >
            <Environment files={"/lebombo_1k.hdr"} />

            <Strip></Strip>
            <Zoetrope speed={speed} image={currentStrip} />
            <Table />
          </Stage>
        </Suspense>
      </Canvas>
      <Footer></Footer>
    </>
  );
}
