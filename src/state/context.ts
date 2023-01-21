import { createContext } from "react";
import { Animation, AnimationAction } from "../types";

export const AnimationContext = createContext<Animation>({
  id: "test",
  type: "image",
});
export const AnimationDispatchContext = createContext<any>(null);
