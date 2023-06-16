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
  animals: {
    themeName: { en: "Animals", fr: "Animaux" },
    deck: animalsDeck,
    highestLevelAchieved: 1,
  },
  artsAndLeisure: {
    themeName: { en: "Arts and Leisure", fr: "Arts et Loisirs" },
    deck: artsAndLeisureDeck,
    highestLevelAchieved: 1,
  },
  dinosaurs: {
    themeName: { en: "Dinosaurs", fr: "Dinosaures" },
    deck: dinosaursDeck,
    highestLevelAchieved: 1,
  },
  famousMonuments: {
    themeName: { en: "Famous Monuments", fr: "Monuments Célèbres" },
    deck: famousMonumentsDeck,
    highestLevelAchieved: 1,
  },
  flora: {
    themeName: { en: "Flora", fr: "Flore" },
    deck: floraDeck,
    highestLevelAchieved: 1,
  },
  fruitsAndVegetables: {
    themeName: { en: "Fruits and Vegetables", fr: "Fruits et Légumes" },
    deck: fruitsAndVegetablesDeck,
    highestLevelAchieved: 1,
  },
  geometricShapes: {
    themeName: { en: "Geometric Shapes", fr: "Formes Géométriques" },
    deck: geometricShapesDeck,
    highestLevelAchieved: 1,
  },
  musicalInstruments: {
    themeName: { en: "Musical Instruments", fr: "Instruments de Musique" },
    deck: musicalInstrumentsDeck,
    highestLevelAchieved: 1,
  },
  professions: {
    themeName: { en: "Professions", fr: "Professions" },
    deck: professionsDeck,
    highestLevelAchieved: 1,
  },
  space: {
    themeName: { en: "Space", fr: "Espace" },
    deck: spaceDeck,
    highestLevelAchieved: 1,
  },
  sports: {
    themeName: { en: "Sports", fr: "Sports" },
    deck: sportsDeck,
    highestLevelAchieved: 1,
  },
  toolsAndMachines: {
    themeName: { en: "Tools and Machines", fr: "Outils et Machines" },
    deck: toolsAndMachinesDeck,
    highestLevelAchieved: 1,
  },
  vehicles: {
    themeName: { en: "Vehicles", fr: "Véhicules" },
    deck: vehiclesDeck,
    highestLevelAchieved: 1,
  },
  worldFlags: {
    themeName: { en: "World Flags", fr: "Drapeaux du Monde" },
    deck: worldFlagsDeck,
    highestLevelAchieved: 1,
  },
};

export { themesData };
