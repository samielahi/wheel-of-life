import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Strip from "./Strip/Strip";

interface ZoetropeProps {
  image?: string;
  speed?: number;
}

export default function Zoetrope(props: ZoetropeProps) {
  const mesh = useRef<any>();
  // If a result.scene prop is found useGLTF will automatically create a object & material collection: { nodes, materials }
  // @ts-ignore
  const { nodes, materials } = useGLTF("/public/zoetrope.glb");
  useFrame(() => (mesh.current!.rotation.y -= props.speed!));
  return (
    <group ref={mesh} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Zoetrope.geometry}
        material={materials["Material.001"]}
        position={[0, 3.5, 0]}
        rotation={[-Math.PI, 0, 0]}
        scale={11}
      />
      <Strip image={props.image} />
    </group>
  );
}

useGLTF.preload("./zoetrope.glb");
