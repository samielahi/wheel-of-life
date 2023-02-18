import { render, screen } from "@testing-library/react";
import AnimationMenu from "../components/AnimationMenu/AnimationMenu";

describe("Testing /animations page functionality", () => {
  it("renders AnimationMenu component", () => {
    render(<AnimationMenu />);

    // screen.debug();
  });
});
