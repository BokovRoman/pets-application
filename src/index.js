import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from "./App";
import GlobalStyles from 'theme/globalStyles';
import { CatProvider } from "./helpers/CatContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <GlobalStyles />
      <CatProvider>
        <App />
      </CatProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

