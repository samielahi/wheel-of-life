import AnimationMenu from "./components/AnimationMenu/AnimationMenu";
import { enableMapSet } from "immer";

export default function App() {
  enableMapSet();
  return (
    <>
      <AnimationMenu />
    </>
  );
}
