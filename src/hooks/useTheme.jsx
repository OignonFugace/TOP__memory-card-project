import { useEffect, useState } from "react";

import { animalsDeck } from "../data/animalsDeck.js";
import { artsAndLeisureDeck } from "../data/artsAndLeisureDeck.js";
import { dinosaursDeck } from "../data/dinosaursDeck.js";
import { famousMonumentsDeck } from "../data/famousMonumentsDeck.js";
import { floraDeck } from "../data/floraDeck.js";
import { fruitsAndVegetablesDeck } from "../data/fruitsAndVegetablesDeck.js";
import { geometricShapesDeck } from "../data/geometricShapesDeck.js";
import { levels } from "../data/levels.js";
import { musicalInstrumentsDeck } from "../data/musicalInstrumentsDeck.js";
import { professionsDeck } from "../data/professionsDeck.js";
import { spaceDeck } from "../data/spaceDeck.js";
import { sportsDeck } from "../data/sportsDeck.js";
import { toolsAndMachinesDeck } from "../data/toolsAndMachinesDeck.js";
import { vehiclesDeck } from "../data/vehiclesDeck.js";
import { worldFlagsDeck } from "../data/worldFlagsDeck.js";

const themes = {
  animals: { deck: animalsDeck, currentLevel: 1 },
  artsAndLeisure: { deck: artsAndLeisureDeck, currentLevel: 1 },
  dinosaurs: { deck: dinosaursDeck, currentLevel: 1 },
  famousMonuments: { deck: famousMonumentsDeck, currentLevel: 1 },
  flora: { deck: floraDeck, currentLevel: 1 },
  fruitsAndVegetables: { deck: fruitsAndVegetablesDeck, currentLevel: 1 },
  geometricShapes: { deck: geometricShapesDeck, currentLevel: 1 },
  musicalInstruments: { deck: musicalInstrumentsDeck, currentLevel: 1 },
  professions: { deck: professionsDeck, currentLevel: 1 },
  space: { deck: spaceDeck, currentLevel: 1 },
  sports: { deck: sportsDeck, currentLevel: 1 },
  toolsAndMachines: { deck: toolsAndMachinesDeck, currentLevel: 1 },
  vehicles: { deck: vehiclesDeck, currentLevel: 1 },
  worldFlags: { deck: worldFlagsDeck, currentLevel: 1 },
};

function useTheme() {
  const [currentTheme, setCurrentTheme] = useState("professions");
  const [currentDeck, setCurrentDeck] = useState(themes[currentTheme].deck);

  useEffect(() => {
    setCurrentDeck(themes[currentTheme].deck);
  }, [currentTheme]);

  return {
    currentTheme,
    setCurrentTheme,
    currentDeck,
    setCurrentDeck,
  };
}

export default useTheme;
