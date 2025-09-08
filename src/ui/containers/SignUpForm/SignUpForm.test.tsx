import { renderComponent } from "@/src/test-utils/renderComponent";
import { fireEvent, screen, waitFor } from "@testing-library/react-native";
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
      expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
        fullname: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
      }), undefined //React hook form call back function
      );
    });
  });
});
