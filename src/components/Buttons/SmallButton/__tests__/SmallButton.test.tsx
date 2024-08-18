import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SmallButton } from "../SmallButton";

describe("SmallButton", () => {
  it("should render a button", async () => {
    const onClick = jest.fn();

    render(<SmallButton onClick={onClick}>Submit</SmallButton>);

    const button = screen.getByRole("button", {
      name: /submit/i,
    });

    await userEvent.click(button);

    expect(button).toBeVisible();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
