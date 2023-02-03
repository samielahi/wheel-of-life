import { useContext } from "react";
import { setFrame, setAnimation } from "../../state/idb";
import { Asset, Frame } from "../../types";
import Header from "../../core/Header";
import Input from "../../core/Input";
// function setupAnimation() {
//   // Setup the animation store
//   const animation = {
//     id: "test",
//     name: "test",
//     isBuilt: false,
//     build: undefined,
//   };
//   setAnimation(animation);
//   // Setup the frame store
//   for (let i = 0; i < 16; i++) {
//     const frame: Frame = {
//       id: i + 1,
//       assetId: undefined,
//       animationId: "test",
//     };

//     setFrame(frame);
//   }
// }

export default function AnimationMenu() {
  return (
    <>
      <Header type="menu"></Header>
      <Input />
    </>
  );
}
