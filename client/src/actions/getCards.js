export const getCards = (cardCode) => {
  const suitMap = {
    H: "Hearts",
    D: "Diamonds",
    C: "Clubs",
    S: "Spades",
  };

  const valueMap = {
    '10': 'T', 
  };

  const originalValue = cardCode.substring(0, cardCode.length - 1);
  const suit = cardCode[cardCode.length - 1];

  // Use the value from the valueMap if it exists, otherwise use the rawValue
  const value = valueMap[originalValue] || originalValue;

  const cardName = `${value}${suitMap[suit]}.png`;

  return `/deck/${cardName}`;
};
