import Zoetrope from "./Zoetrope";
import Table from "./Table";
import { OrbitControls, Stage, Environment } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, FormEvent, MouseEvent, useState, useRef } from "react";
import { blobToDataURL } from "../../utils";
import { getAllAnimations } from "../../state/idb";
import Strip from "./Strip/Strip";
import Footer from "../../core/Footer";
import Controls from "./Controls";
import Header from "../../core/Header";

export default function Scene() {
  const [zoomed, setZoomed] = useState(false);
  const zoetropeRef = useRef<any>(null);
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
      const animationDataURLs: Record<string, string> = {
        Jessica: "/strips/Jessica.png",
      };

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
        <Header type="zoetrope"></Header>

        <div className="absolute left-[5%] top-[70%] z-20 hidden w-[16rem] rounded-md bg-yellow/40 p-6 backdrop-blur lg:block">
          <div className="flex flex-col justify-center gap-2">
            <h3 className="text-center text-lg text-red">Controls:</h3>
            <p className="italic">
              <span className="font-bold">Zoom:</span> scroll
            </p>
            <p className="italic">
              <span className="font-bold">Tilt:</span> left click + drag.
            </p>
            <p className="italic">
              <span className="font-bold">Pan:</span> right click + drag.
            </p>
          </div>
        </div>

        <Controls
          changeSpeed={changeZoetropeSpinSpeed}
          selectStrip={selectStrip}
          animations={animations}
        />

        <Canvas
          shadows
          camera={{ position: [0, 2.75, 15], fov: 60 }}
          className="cursor-grab overflow-hidden"
        >
          <OrbitControls
            maxDistance={15}
            minDistance={5}
            minAzimuthAngle={0}
            maxAzimuthAngle={0}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2.5}
          />
          <Stage
            adjustCamera={false}
            intensity={0.4}
            shadows={{
              type: "accumulative",
              color: "gray",
              colorBlend: 1,
              opacity: 0.4,
            }}
            // @ts-ignore
            environment={null}
            preset="rembrandt"
          >
            <Environment files={"/lebombo_1k.hdr"} />

            <Strip></Strip>
            <Zoetrope
              onClick={() => setZoomed(!zoomed)}
              ref={zoetropeRef}
              speed={speed}
              image={currentStrip}
            />
            <Table />
          </Stage>
        </Canvas>

        <Footer />
    </>
  );
}
