import Zoetrope from "./Zoetrope";
import Table from "./Table";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, FormEvent, MouseEvent } from "react";
import jessica from "../../assets/example_strips/Jessica.png";
import { useState } from "react";
import { blobToDataURL } from "../../utils";
import { getAllAnimations } from "../../state/idb";
import Strip from "./Strip/Strip";
import Footer from "../../core/Footer";

export default function Scene() {
  // const [animations, setAnimations] = useState<Record<string, string>>({});
  // const [speed, setSpeed] = useState(0);
  // const [currentStrip, setCurrentStrip] = useState(jessica);

  // function changeZoetropeSpinSpeed(e: FormEvent<HTMLInputElement>) {
  //   const target = e.target as HTMLInputElement;
  //   const speed = parseFloat(target.value);
  //   setSpeed(speed);
  // }

  // function selectStrip(e: MouseEvent) {
  //   const target = e.target as HTMLOptionElement;
  //   const strip = target.value;
  //   setCurrentStrip(strip);
  // }

  // useEffect(() => {
  //   async function loadAnimations() {
  //     const animationDataURLs: Record<string, string> = { Jessica: jessica };

  //     for (const animation of await getAllAnimations()) {
  //       const name = animation.name!;
  //       const blob = animation.build!;
  //       if (blob) {
  //         const dataURL = await blobToDataURL(blob);
  //         animationDataURLs[name] = dataURL;
  //       }
  //     }
  //     setAnimations(animationDataURLs);
  //   }
  //   loadAnimations();
  // }, []);

  return (
    <>
      {/* <div className="fixed z-20 w-full">
        <div className="flex items-center justify-center bg-bg/40 py-10 backdrop-blur-2xl">
          <h1 className="text-5xl text-red">Wheel Of Life</h1>
        </div>
      </div>

      <div className="absolute left-[5%] top-[75%] z-20 rounded-md bg-yellow/40 p-6 backdrop-blur">
        <h3 className="text-lg text-red">Now Playing:</h3>
        <p className="italic">Jessica Campbell</p>
      </div>

      <div className="absolute left-[80%] top-[70%] z-20 h-max w-max rounded-md bg-silver p-6 text-center text-lg drop-shadow-md backdrop-blur-3xl">
        <div className="flex flex-col gap-4">
          <label htmlFor="speed-select">
            <h3 className="text-red">Set spin speed :</h3>
          </label>
          <input
            id="speed-select"
            type="range"
            min="0"
            max="0.05"
            step="0.01"
            onChange={changeZoetropeSpinSpeed}
          />
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <label htmlFor="strip-select">
            <h3 className="text-violet">Choose a strip :</h3>
          </label>
          <select
            name="strips"
            id="strip-select"
            className="cursor-pointer rounded p-2 bg-white"
            onClick={selectStrip}
          >
            <option defaultValue={jessica}>--select strip--</option>
            {Object.entries(animations).map((animation, i) => (
              <option key={i} value={animation[1]}>
                {animation[0]}
              </option>
            ))}
          </select>
        </div>
      </div>

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
            environment="apartment"
            preset="rembrandt"
          >
            <Strip></Strip>
            <Zoetrope speed={speed} image={currentStrip} />
            <Table />
          </Stage>
        </Suspense>
      </Canvas>
      <Footer></Footer> */}
    </>
  );
}
