import "./App.css";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { FrontPage, GamePage, InfoGamePage } from "./pages";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/about" element={<InfoGamePage />} />
        <Route path="/board" element={<GamePage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
