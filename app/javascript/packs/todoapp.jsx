import React from "react";
import ReactDOM from "react-dom";
import App from "components/App";

import { store } from "../store/configureStore";
import { Provider } from 'react-redux';

document.addEventListener("DOMContentLoaded", () => {
  console.log("Before render");
  ReactDOM.render(
    <Provider store={store}><App /></Provider>,
    document.body.appendChild(document.createElement("div"))
  );
});