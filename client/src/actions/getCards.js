export const getCards = (cardCode) => {
  const suitMap = {
    H: "Hearts",
    D: "Diamonds",
    C: "Clubs",
    S: "Spades",
  };

  const value = cardCode.substring(0, cardCode.length - 1);

  const suit = cardCode[cardCode.length - 1];

  const cardName = `${value}${suitMap[suit]}.png`;

  return `/deck/${cardName}`;
};
