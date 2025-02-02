import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../src/pages/auth/Login";
import { vi } from "vitest";
import { loginUser } from "../src/store/actions/userActions";
import useToast from "../src/hooks/useToast";
import { Provider } from "react-redux";

vi.mock("../../hooks/useToast", () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

vi.mock("../../store/actions/userActions", () => ({
  loginUser: vi.fn(),
}));

vi.mock("react-redux", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(() => ({
      user: {
        loading: false,
      },
    })),

    Provider: actual.Provider,
  };
});

describe("Login Component", () => {
  it("should render login form", () => {
    render(
      <Provider store={{ getState: () => ({}), dispatch: vi.fn() }}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Don't have an account\? Register/i)
    ).toBeInTheDocument();
  });

  it("should update user state on input change", () => {
    render(
      <Provider store={{ getState: () => ({}), dispatch: vi.fn() }}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    expect(screen.getByLabelText(/Email/i).value).toBe("test@example.com");
    expect(screen.getByLabelText(/Password/i).value).toBe("password123");
  });

  it("should dispatch loginUser and show toast on success", async () => {
    const mockShowToast = vi.fn();
    useToast.mockReturnValue({ showToast: mockShowToast });
    loginUser.mockResolvedValue({ msg: "Login successful!" });

    render(
      <Provider store={{ getState: () => ({}), dispatch: vi.fn() }}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        "Login successful!",
        "success"
      );
    });
  });

  it("should show error toast on failure", async () => {
    const mockShowToast = vi.fn();
    useToast.mockReturnValue({ showToast: mockShowToast });
    loginUser.mockRejectedValue("Invalid credentials");

    render(
      <Provider store={{ getState: () => ({}), dispatch: vi.fn() }}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        "Invalid credentials",
        "error"
      );
    });
  });
});
