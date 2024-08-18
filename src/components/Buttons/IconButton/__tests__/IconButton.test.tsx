import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IconButton } from "../IconButton";
import { HiOutlineArrowLeft } from "react-icons/hi";

describe("IconButton", () => {
  it("should render a button", async () => {
    const onClick = jest.fn();

    render(
      <IconButton onClick={onClick} aria-label="back">
        <HiOutlineArrowLeft size={24} />
      </IconButton>
    );

    const button = screen.getByRole("button", {
      name: /back/i,
    });

    await userEvent.click(button);

    expect(button).toBeVisible();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
