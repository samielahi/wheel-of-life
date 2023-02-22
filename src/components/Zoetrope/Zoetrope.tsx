import { useRef, forwardRef, ForwardedRef, MutableRefObject } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Strip from "./Strip/Strip";

interface ZoetropeProps {
  image?: string;
  speed?: number;
  onClick?: () => void;
}

const Zoetrope = forwardRef(function Zoetrope(
  props: ZoetropeProps,
  meshRef: ForwardedRef<any>
) {
  // If a result.scene prop is found useGLTF will automatically create a object & material collection: { nodes, materials }
  // @ts-ignore
  const { nodes, materials } = useGLTF("/models/zoetrope.glb");
  useFrame(
    () => ((meshRef as MutableRefObject<any>)!.current.rotation.y -= props.speed!)
  );
  return (
    <group ref={meshRef} {...props} dispose={null} onClick={props.onClick}>
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
});

useGLTF.preload("/models/zoetrope.glb");

export default Zoetrope;
