import { useEffect, useState } from "react";

import { animalsDeck } from "../data/animalsDeck.js";
import { artsAndLeisureDeck } from "../data/artsAndLeisureDeck.js";
import { dinosaursDeck } from "../data/dinosaursDeck.js";
import { famousMonumentsDeck } from "../data/famousMonumentsDeck.js";
import { floraDeck } from "../data/floraDeck.js";
import { fruitsAndVegetablesDeck } from "../data/fruitsAndVegetablesDeck.js";
import { geometricShapesDeck } from "../data/geometricShapesDeck.js";
import { musicalInstrumentsDeck } from "../data/musicalInstrumentsDeck.js";
import { professionsDeck } from "../data/professionsDeck.js";
import { spaceDeck } from "../data/spaceDeck.js";
import { sportsDeck } from "../data/sportsDeck.js";
import { toolsAndMachinesDeck } from "../data/toolsAndMachinesDeck.js";
import { vehiclesDeck } from "../data/vehiclesDeck.js";
import { worldFlagsDeck } from "../data/worldFlagsDeck.js";

const themesData = {
  animals: { deck: animalsDeck, highestLevelAchieved: 1 },
  artsAndLeisure: { deck: artsAndLeisureDeck, highestLevelAchieved: 1 },
  dinosaurs: { deck: dinosaursDeck, highestLevelAchieved: 1 },
  famousMonuments: { deck: famousMonumentsDeck, highestLevelAchieved: 1 },
  flora: { deck: floraDeck, highestLevelAchieved: 1 },
  fruitsAndVegetables: { deck: fruitsAndVegetablesDeck, highestLevelAchieved: 1 },
  geometricShapes: { deck: geometricShapesDeck, highestLevelAchieved: 1 },
  musicalInstruments: { deck: musicalInstrumentsDeck, highestLevelAchieved: 1 },
  professions: { deck: professionsDeck, highestLevelAchieved: 1 },
  space: { deck: spaceDeck, highestLevelAchieved: 1 },
  sports: { deck: sportsDeck, highestLevelAchieved: 1 },
  toolsAndMachines: { deck: toolsAndMachinesDeck, highestLevelAchieved: 1 },
  vehicles: { deck: vehiclesDeck, highestLevelAchieved: 1 },
  worldFlags: { deck: worldFlagsDeck, highestLevelAchieved: 1 },
};

function useTheme() {
  const [themes, setThemes] = useState(themesData);
  const [currentTheme, setCurrentTheme] = useState("professions");
  const [currentDeck, setCurrentDeck] = useState(null);
  const [highestLevelAchieved, setHighestLevelAchieved] = useState(1);

  useEffect(() => {
    setCurrentDeck(themes[currentTheme].deck);
    setHighestLevelAchieved(themes[currentTheme].highestLevelAchieved);
  }, [currentTheme]);

  useEffect(() => {
    setThemes(prevThemes => ({
      ...prevThemes,
      [currentTheme]: {
        ...prevThemes[currentTheme],
        highestLevelAchieved: highestLevelAchieved,
      }
    }))
  }, [highestLevelAchieved])

  return {
    currentTheme,
    setCurrentTheme,
    currentDeck,
    setCurrentDeck,
    highestLevelAchieved,
    setHighestLevelAchieved,
  };
}

export default useTheme;
