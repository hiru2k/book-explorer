import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "../src/components/InputField";
import { vi } from "vitest";

describe("InputField Component", () => {
  const mockOnChange = vi.fn();

  it("should render the input field correctly with the given label", () => {
    render(
      <InputField
        label="Email"
        type="email"
        name="email"
        value=""
        onChange={mockOnChange}
        required={true}
      />
    );

    const label = screen.getByLabelText(/Email/i);
    expect(label).toBeTruthy();
  });

  it("should render input with correct type", () => {
    render(
      <InputField
        label="Email"
        type="email"
        name="email"
        value=""
        onChange={mockOnChange}
        required={true}
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toHaveProperty("type", "email");
  });

  it("handles input changes", () => {
    render(
      <InputField
        label="Email"
        type="email"
        name="email"
        value=""
        onChange={mockOnChange}
        required={true}
      />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "test@example.com" } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("renders input as disabled when disabled prop is true", () => {
    render(
      <InputField
        label="Email"
        type="email"
        name="email"
        value=""
        onChange={mockOnChange}
        required={true}
        disabled={true}
      />
    );

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeTruthy();
    expect(inputElement.disabled).toBe(true);
  });
});
