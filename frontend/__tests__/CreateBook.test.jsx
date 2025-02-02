import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import CreateBook from "../src/pages/books/CreateBook";
import { store } from "../src/store/store";
import { setGenreFilter } from "../src/store/reducers/bookReducer";

vi.mock("../../hooks/useToast", () => ({
  useToast: () => ({
    showToast: vi.fn(),
  }),
}));

vi.mock("../../apis/axiosInstance", () => ({
  post: vi
    .fn()
    .mockResolvedValue({ data: { msg: "Book created successfully" } }),
  put: vi
    .fn()
    .mockResolvedValue({ data: { msg: "Book updated successfully" } }),
}));

vi.mock("../../hooks/useGenres", () => ({
  useGenres: () => ({
    genres: ["fiction", "non-fiction", "fantasy"],
  }),
}));

describe("CreateBook Component", () => {
  beforeEach(() => {
    store.dispatch(setGenreFilter(""));
  });

  it("should render CreateBook form", () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateBook />
        </Router>
      </Provider>
    );

    expect(screen.getByLabelText(/Book ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Genre/i)).toBeInTheDocument();
  });

  it("should submit form and create a book", async () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateBook />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Book ID/i), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Book Title" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Description of the book" },
    });

    fireEvent.change(screen.getByLabelText(/Genre/i), {
      target: { value: "fiction" },
    });

    fireEvent.click(screen.getByText(/Publish Book/i));

    await waitFor(() =>
      expect(screen.getByText(/Book created successfully/i)).toBeInTheDocument()
    );
  });

  it("should show a warning if genre is not selected", async () => {
    render(
      <Provider store={store}>
        <Router>
          <CreateBook />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Book ID/i), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Book Title" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Description of the book" },
    });

    fireEvent.click(screen.getByText(/Publish Book/i));

    await waitFor(() =>
      expect(screen.getByText(/Please select a genre/i)).toBeInTheDocument()
    );
  });

  it("should show a warning if user is not logged in", async () => {
    const mockStore = {
      ...store,
      getState: () => ({
        user: {
          isLogged: false,
          user: null,
        },
      }),
    };

    render(
      <Provider store={mockStore}>
        <Router>
          <CreateBook />
        </Router>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/Book ID/i), {
      target: { value: "12345" },
    });
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Book Title" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Description of the book" },
    });
    fireEvent.change(screen.getByLabelText(/Genre/i), {
      target: { value: "fiction" },
    });

    fireEvent.click(screen.getByText(/Publish Book/i));

    await waitFor(() =>
      expect(screen.getByText(/Restricted access/i)).toBeInTheDocument()
    );
  });
});
