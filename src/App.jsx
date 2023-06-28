import "./App.css";
import Footer from "./components/Footer";
import AppLoader from "./components/AppLoader";
import MainContent from "./components/MainContent";

function App() {
  return (
    <div className="App">
      <AppLoader>
        <MainContent />
        <Footer />
      </AppLoader>
    </div>
  );
}

export default App;
