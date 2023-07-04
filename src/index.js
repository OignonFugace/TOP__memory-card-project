import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { LanguageContextProvider, ThemeContextProvider, GameContextProvider, AppContextProvider } from "./contexts";
import { BrowserRouter } from "react-router-dom";
import AppLoader from "./components/AppLoader";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <LanguageContextProvider>
          <ThemeContextProvider>
            <GameContextProvider>
              <AppLoader>
                <App />
              </AppLoader>
            </GameContextProvider>
          </ThemeContextProvider>
        </LanguageContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
