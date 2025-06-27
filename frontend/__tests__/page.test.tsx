import "@testing-library/jest-dom";
import { render, screen } from "@/lib/jest";
import Home from "@/app/page";

describe("Page", () => {
  it("renders the loading state", () => {
    render(<Home />);

    const loadingText = screen.getByText("Loading...");

    expect(loadingText).toBeInTheDocument();
  });
});
