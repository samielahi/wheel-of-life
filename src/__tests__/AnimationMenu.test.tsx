import { render, fireEvent, cleanup, waitFor } from "@testing-library/react";
import { getAnimation } from "../state/idb";
import AnimationMenu from "../components/AnimationMenu/AnimationMenu";

afterEach(cleanup);

describe("Animation Menu", () => {
  // test("verify that help modal toggle works", () => {});

  // test("verify that clicking outside help modal closes it", () => {});

  // test("verify that clicking cancel closes help modal", () => {});

  // test("verify that checking input box prevents modal from showing on reload", () => {});
  test("verify animation strip creation works", () => {
    const { getByText, debug } = render(<AnimationMenu />);

    const createStripButton = getByText("create strip");

    fireEvent.click(createStripButton);

    debug();
  });
});
