import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Table() {
  const mesh = useRef<any>();
  // If a result.scene prop is found useGLTF will automatically create a object & material collection: { nodes, materials }
  // @ts-ignore
  const { nodes, materials } = useGLTF("./table.glb");
  return (
    <group ref={mesh} dispose={null}>
      <group scale={[0.89, 4.09, 0.89]}>
        <mesh
          castShadow
          receiveShadow
          scale={2}
          geometry={nodes.Plane005.geometry}
          material={materials.TableTop}
        />
        <mesh
          castShadow
          receiveShadow
          scale={2}
          geometry={nodes.Plane005_1.geometry}
          material={materials.WoodTexture}
        />
      </group>
    </group>
  );
}

useGLTF.preload("./table.glb");
