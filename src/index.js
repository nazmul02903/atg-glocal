import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import "./index.css";
import App from "./App";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import Theme from "./theme";
import './i18n';

const engine = new Styletron();
//SET NODE_OPTIONS=--openssl-legacy-provider && 
ReactDOM.render(
  <Provider store={store}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={Theme}>
        <App />
      </BaseProvider>
    </StyletronProvider>
  </Provider>,
  document.getElementById("root")
);
