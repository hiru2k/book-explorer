import { BrowserRouter as Router } from "react-router-dom";
import MainPages from "./pages/Pages";
import Header from "./components/Header";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/store";
import { ToastContainer } from "react-toastify";
import { GenreProvider } from "./context/GenreContext";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <GenreProvider>
            <div className="App">
              <Header />
              <MainPages />
              <ToastContainer autoClose={1100} position="top-center" />
            </div>
          </GenreProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
