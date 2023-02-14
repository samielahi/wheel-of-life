// @ts-nocheck
import { useMemo, useRef } from "react";
import { Mesh } from "three";
import * as THREE from "three";
import { createStripPoints, createTexture } from "./utils";

export interface StripProps {
  image?: string;
}

export default function Strip(props: StripProps) {
  const ref = useRef<Mesh>(null);
  let texture = useMemo(() => createTexture(props.image), [props.image]);
  let stripPoints = createStripPoints();

  const geometry = useMemo(
    () => new THREE.PlaneGeometry(1, 1, 200, 1).setFromPoints(stripPoints),
    [stripPoints]
  );

  return (
    <>
      <mesh scale={1.52} position={[0, 2.75, 0]} geometry={geometry} ref={ref}>
        <meshStandardMaterial
          map={texture}
          side={THREE.BackSide}
          roughness={1}
          metalness={0.25}
          alphaTest={true}
        />
      </mesh>
    </>
  );
}
