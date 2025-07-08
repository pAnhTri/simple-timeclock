import "@testing-library/jest-dom";
import { render, screen } from "@/lib/jest";
import Page from "@/app/page";

describe("Page", () => {
  it("renders a button", () => {
    render(<Page />);

    const button = screen.getByRole("button", { name: "Click me" });

    expect(button).toBeInTheDocument();
  });
});
