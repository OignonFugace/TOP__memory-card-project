import { useContext } from "react";
import ThemeContext from "../../context/ThemeContextProvider";
import "./ThemeSelector.css";

function ThemeSelector() {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

  function handleThemeChange(e) {
    setCurrentTheme(e.target.value);
  }

  return (
    <div className="theme-selector">
      <h2>Choose Your Adventure!</h2>
      <div>
        <label htmlFor="theme-select">Pick Your Theme: </label>
        <select
          value={currentTheme}
          onChange={handleThemeChange}
          id="theme-select"
        >
          <option value="professions">Professions</option>
          <option value="animals">Animals</option>
          <option value="geometricShapes">Geometric Shapes</option>
          <option value="worldFlags">World Flags</option>
          <option value="vehicles">Vehicles</option>
          <option value="musicalInstruments">Musical Instruments</option>
          <option value="fruitsAndVegetables">Fruits and Vegetables</option>
          <option value="famousMonuments">Famous Monuments</option>
          <option value="space">Space</option>
          <option value="flora">Flora</option>
          <option value="dinosaurs">Dinosaurs</option>
          <option value="toolsAndMachines">Tools and Machines</option>
          <option value="sports">Sports</option>
          <option value="artsAndLeisure">Arts and Leisure</option>
        </select>
      </div>
    </div>
  );
}

export default ThemeSelector;
