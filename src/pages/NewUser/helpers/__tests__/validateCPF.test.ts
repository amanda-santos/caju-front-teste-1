import { validateCPF } from "../validateCPF";

describe("validateCPF", () => {
  it("should return true if the CPF is valid", () => {
    expect(validateCPF("12345678909")).toBe(true);
  });

  it("should return false if the CPF is empty", () => {
    expect(validateCPF("")).toBe(false);
  });

  it("should return false if the CPF has less than 11 digits", () => {
    expect(validateCPF("123456789")).toBe(false);
  });

  it("should return false if the CPF has more than 11 digits", () => {
    expect(validateCPF("1234567891011")).toBe(false);
  });

  it("should return false if the CPF contains non-digit characters", () => {
    expect(validateCPF("123.456.789-10")).toBe(false);
  });

  it("should return false if the CPF contains letters", () => {
    expect(validateCPF("123456789A10")).toBe(false);
  });
});
