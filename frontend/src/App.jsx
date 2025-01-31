import { BrowserRouter as Router } from "react-router-dom";
import MainPages from "./components/mainpages/Pages";
import Header from "./components/header/Header";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <MainPages />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
