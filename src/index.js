import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./redux/store";
import { I18nextProvider } from "react-i18next";
import { persistStore } from "redux-persist";

// Import Components
import App from "./App";
import i18n from "./i18n";

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <I18nextProvider i18n={i18n}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </I18nextProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
