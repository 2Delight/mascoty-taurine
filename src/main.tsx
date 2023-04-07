import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";
// import { store } from './utils/redux_state/Store'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  // <Provider store={store}>
  <App />
  // </Provider>
);
