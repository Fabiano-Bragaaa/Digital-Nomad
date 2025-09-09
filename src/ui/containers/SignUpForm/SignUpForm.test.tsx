import { renderComponent } from "@/src/test-utils/renderComponent";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
import theme from "../../theme/theme";
import { SignUpForm } from "./SignUpForm";

describe("<SignUpForm />", () => {
  it("should submit the form when all fields are filled in correctly", async () => {
    const onSubmit = jest.fn();
    renderComponent(<SignUpForm onSubmit={onSubmit} />);
    fireEvent.changeText(
      screen.getByPlaceholderText("Seu nome completo"),
      "John Doe"
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Digite seu email"),
      "john.doe@example.com"
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Crie uma senha"),
      "password123"
    );
    fireEvent.changeText(
      screen.getByPlaceholderText("Repita a senha"),
      "password123"
    );

    fireEvent.press(screen.getByText("Criar conta"));

    waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          fullname: "John Doe",
          email: "john.doe@example.com",
          password: "password123",
        }),
        undefined //React hook form call back function
      );
    });
  });

  describe("should not submit form ", () => {
    it("when the password and confirm password are not the same", async () => {
      const onSubmit = jest.fn();
      renderComponent(<SignUpForm onSubmit={onSubmit} />);
      fireEvent.changeText(
        screen.getByPlaceholderText("Seu nome completo"),
        "John Doe"
      );
      fireEvent.changeText(
        screen.getByPlaceholderText("Digite seu email"),
        "john.doe@example.com"
      );
      fireEvent.changeText(
        screen.getByPlaceholderText("Crie uma senha"),
        "password123"
      );
      fireEvent.changeText(
        screen.getByPlaceholderText("Repita a senha"),
        "password1234"
      );

      fireEvent.press(screen.getByText("Criar conta"));

      expect(await screen.findByText("as senhas não correspondem"));

      //style test

      expect(screen.getByTestId("confirm-password-container")).toHaveStyle({
        borderColor: theme.colors.fbErrorSurface,
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });
    it("when the email is not valid", async () => {
      const onSubmit = jest.fn();
      renderComponent(<SignUpForm onSubmit={onSubmit} />);
      fireEvent.changeText(
        screen.getByPlaceholderText("Seu nome completo"),
        "John Doe"
      );
      fireEvent.changeText(
        screen.getByPlaceholderText("Digite seu email"),
        "john.doeexample.com"
      );
      fireEvent.changeText(
        screen.getByPlaceholderText("Crie uma senha"),
        "password123"
      );
      fireEvent.changeText(
        screen.getByPlaceholderText("Repita a senha"),
        "password123"
      );

      fireEvent.press(screen.getByText("Criar conta"));

      expect(await screen.findByText("email inválido"));
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });
});
