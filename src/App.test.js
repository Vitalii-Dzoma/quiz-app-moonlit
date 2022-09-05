import { render, screen } from "@testing-library/react";
import App from "./App";
import App1 from "./App1";

test("renders learn react link", () => {
  render(<App1 />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
