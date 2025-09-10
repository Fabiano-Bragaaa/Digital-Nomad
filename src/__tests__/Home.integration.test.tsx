import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react-native";
import { renderApp } from "../test-utils/renderApp";

describe("integration: Home", () => {
  it("should display the city list and naviagate to details when the city card is pressed", async () => {
    renderApp({ isAuthenticated: true });

    fireEvent.press(await screen.findByText("Rio de Janeiro"));

    expect(await screen.findByText(/pontos turísticos/i)).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId("Chevron-left"));
    expect(await screen.findByText(/bangkok/i)).toBeOnTheScreen();

    fireEvent.changeText(
      screen.getByPlaceholderText(/qual o seu proximo destino?/i),
      "Barcelona"
    );

    await waitForElementToBeRemoved(() => screen.getByText(/bangkok/i));
    expect(await screen.findByText(/barcelona/i)).toBeOnTheScreen();

    fireEvent.press(screen.getByTestId("Close"));

    expect(await screen.findByText(/tóquio/i)).toBeOnTheScreen();
  });
});
