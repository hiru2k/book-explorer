import { BrowserRouter as Router } from "react-router-dom";
import MainPages from "./components/mainpages/Pages";
import Header from "./components/header/Header";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Header />
            <MainPages />
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
