function trimFullDeck(fullDeck, level) {
  switch (level) {
    case 1:
      return fullDeck.slice(0, 5);
    case 2:
      return fullDeck.slice(0, 10);
    case 3:
      return fullDeck.slice(0, 20);
    default:
      throw new Error(`Invalid level: ${level}`);
  }
}

function ficherYatesShuffle(deck) {
  const deckCopy = [...deck];
  let m = deckCopy.length, i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    [deckCopy[m], deckCopy[i]] = [deckCopy[i], deckCopy[m]];
  }

  return deckCopy;
}

function getDisplayedCards(cards, totalDisplayedCards) {
  const notClickedCards = cards.filter(card => !card.isClicked);

  if (notClickedCards.length === 0) return ficherYatesShuffle(cards).slice(0, totalDisplayedCards);

  const randomNotClickedCardIndex = Math.floor(Math.random() * notClickedCards.length);
  const randomNotClickedCard = notClickedCards[randomNotClickedCardIndex];
  
  const otherCards = cards.filter(card => card.id !== randomNotClickedCard.id);
  const shuffledOtherCards = ficherYatesShuffle(otherCards);

  const displayCards = shuffledOtherCards.slice(0, totalDisplayedCards - 1);
  const randomIndex = Math.floor(Math.random() * displayCards.length);
  displayCards.splice(randomIndex, 0, randomNotClickedCard);

  return displayCards;
}

export { trimFullDeck, ficherYatesShuffle as shuffleDeck, getDisplayedCards };
