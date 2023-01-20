import { Animation } from "../types";

export default function AnimationReducer(draft: Animation, action: any) {
  switch (action.type) {
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
