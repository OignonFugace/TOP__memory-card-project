import "./App.css";
import Footer from "./components/Footer";
import AppLoader from "./components/AppLoader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InfoGamePage from "./pages/InfoGamePage";
import FrontPage from "./pages/FrontPage";
import GamePage from "./pages/GamePage";
import { LanguageContextProvider } from "./context/LanguageContext";
import { ThemeContextProvider } from "./context/ThemeContextProvider";
import { AppContextProvider } from "./context/AppContextProvider";
import { GameContextProvider } from "./context/GameContextProvider";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContextProvider>
          <LanguageContextProvider>
            <ThemeContextProvider>
              <GameContextProvider>
                <AppLoader>
                    
                  <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/about" element={<InfoGamePage />} />
                    <Route path="/board" element={<GamePage />} />
                  </Routes>

                  <Footer />

                </AppLoader>
              </GameContextProvider>
            </ThemeContextProvider>
          </LanguageContextProvider>
        </AppContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
