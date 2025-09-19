import { fireEvent, screen } from "@testing-library/react-native";
import { AuthUser } from "../domain/auth/AuthUser";
import { renderApp } from "../test-utils/renderApp";

const mockedAuthUser: AuthUser = {
  id: "1",
  email: "fabiano@gmail.com",
  fullname: "Fabiano Braga",
  createdAt: "2025-09-03T12:13:09.324292Z",
};
describe("integration: Profile", () => {
  it("should update the profile user", async () => {
    renderApp({
      isAuthenticated: true,
      repository: {
        auth: {
          getUser: () => mockedAuthUser,
        },
      },
    });

    fireEvent.press(await screen.findByText("Perfil"));

    expect(await screen.findByText(/Informações da conta/i)).toBeOnTheScreen();
    expect(await screen.findByText(/Fabiano Braga/i)).toBeOnTheScreen();
    expect(await screen.findByText(/fabiano@gmail.com/i)).toBeOnTheScreen();
    expect(await screen.findByText(/setembro 2025/i)).toBeOnTheScreen();

    fireEvent.press(screen.getByText("Editar perfil"));

    expect(await screen.findByText(/Atualizar perfil/i)).toBeOnTheScreen();

    fireEvent.changeText(screen.getByPlaceholderText(/nome completo/i), "Fabiano Braga");
    fireEvent.changeText(screen.getByPlaceholderText(/email/i), "fabiano@gmail.com");
    fireEvent.press(screen.getByText("Atualizar"));

    expect(await screen.findByText(/Perfil atualizado com sucesso/i)).toBeOnTheScreen();

    expect(await screen.findByText(/Informações da conta/i)).toBeOnTheScreen();

    
  });
});
