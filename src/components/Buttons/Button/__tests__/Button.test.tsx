import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "../Button";

describe("Button", () => {
  it("should render a button", async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Submit</Button>);

    const button = screen.getByRole("button", {
      name: /submit/i,
    });

    await userEvent.click(button);

    expect(button).toBeVisible();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
