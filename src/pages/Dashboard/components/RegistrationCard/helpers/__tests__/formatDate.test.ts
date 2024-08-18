import { formatDate } from "../formatDate";

describe("formatDate", () => {
  it("should format date correctly", () => {
    const formattedDate = formatDate("2022-04-01");
    expect(formattedDate).toBe("01/04/2022");
  });

  it("should return the same date if it is already in the correct format", () => {
    const formattedDate = formatDate("01/04/2022");
    expect(formattedDate).toBe("01/04/2022");
  });
});
