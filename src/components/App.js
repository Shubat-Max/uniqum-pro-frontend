import React from "react";
import { configureStore } from "../store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "normalize.css";

import CustomRouter from "./CustomRouter";

const App = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <BrowserRouter>
        <CustomRouter />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
