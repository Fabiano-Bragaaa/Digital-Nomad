import { fireEvent, screen } from "@testing-library/react-native";
import { renderApp } from "../test-utils/renderApp";

describe("integration: Auth Flow", () => {
  it("the user can sign in and sign out", async () => {
    renderApp()

    //waiting for screen to be rendered
    expect(await screen.findByText("Bem-vindo"))

    //type email and password
    fireEvent.changeText(screen.getByPlaceholderText("Email"), "fabiano@gmail.com");
    fireEvent.changeText(screen.getByPlaceholderText("Senha"), "123456");


    //click on sign in button

    fireEvent.press(screen.getByText("Entrar"));

    //verify toast message

    expect(await screen.findByText('Login realizado com sucesso')).toBeOnTheScreen()

    //verify if home screen is rendered

    expect(await screen.findByText('Rio de Janeiro')).toBeOnTheScreen()

    //press the profile tab

    fireEvent.press(screen.getByText('Perfil'))

    // press the sign out button

    fireEvent.press(screen.getByText('Sair'))

    // verify if sign in screen is rendered

    expect(await screen.findByText('Bem-vindo')).toBeOnTheScreen()
  });
});