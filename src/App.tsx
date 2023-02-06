import { Frame } from "./types";
import Button from "./core/Button";
import { setFrame, setAnimation } from "./state/idb";
import AnimationMenu from "./components/AnimationMenu/AnimationMenu";
import AnimationEditor from "./components/AnimationEditor/AnimationEditor";
import { enableMapSet } from "immer";

export default function App() {
  enableMapSet();
  return (
    <>
      <AnimationMenu />
      {/* <AnimationEditor animationId="test" name="test" /> */}
      {/* <Button onClick={setupAnimation}>make</Button> */}
    </>
  );
}
