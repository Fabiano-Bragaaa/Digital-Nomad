import { AllTheProviders } from "@/src/test-utils/renderComponent";
import { act, cleanup, renderHook } from "@testing-library/react-native";
import { AuthUser } from "../../AuthUser";
import { useAuthSignIn } from "../useAuthSignIn";

const mockSignIn = jest.fn();
const mockSend = jest.fn();
const mockSaveAuthUser = jest.fn();

jest.mock("@/src/infra/repositories/RepositoryProvider", () => ({
  useRepository: () => ({
    auth: {
      signIn: mockSignIn,
    },
  }),
}));

jest.mock("@/src/infra/feedbackService/FeedbackProvider", () => ({
  useFeedbackService: () => ({
    send: mockSend,
  }),
}));

jest.mock("@/src/domain/auth/AuthContext", () => ({
  useAuth: () => ({
    saveAuth: mockSaveAuthUser,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});



describe("useAuthSignIn()", () => {
  afterEach(() => cleanup());
  it("calls saveAuthUser and sends success feedback on successful sign in", async () => {
    const user: AuthUser = {
      email: "test@test.com",
      fullname: "Test User",
      id: "1",
      createdAt: "2025-09-03T12:13:09.324292Z",
    };

    mockSignIn.mockResolvedValueOnce(user);

    const { result } = renderHook(() => useAuthSignIn(), {wrapper: AllTheProviders});

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.mutate({
        email: "test@test.com",
        password: "123456",
      });
    });

    expect(mockSignIn).toHaveBeenCalledWith("test@test.com", "123456");
    expect(mockSaveAuthUser).toHaveBeenCalledWith(user);
    expect(mockSend).toHaveBeenCalledWith({
      type: "success",
      message: "Login realizado com sucesso",
    });
  });
  it("sends an error feedback on failed sign in", async () => {
    mockSignIn.mockRejectedValueOnce(new Error("Invalid credentials"));
    const { result } = renderHook(() => useAuthSignIn(), {wrapper: AllTheProviders});

    expect(result.current.isLoading).toBe(false);

    await act(async () => {
      await result.current.mutate({
        email: "test@test.com",
        password: "123456",
      });
    });

    expect(mockSend).toHaveBeenCalledWith({
      type: "error",
      message: "Erro ao realizar login",
    });
  });
});
