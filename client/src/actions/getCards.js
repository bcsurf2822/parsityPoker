export const getCards = (cardCode) => {

  const suitMap = {
    'H': 'Hearts',
    'D': 'Diamonds',
    'C': 'Clubs',
    'S': 'Spades'
  };

  const value = cardCode.substring(0, cardCode.length - 1);

  console.log("GET CARD IMG VALUE", value)


  const suit = cardCode[cardCode.length - 1];

  console.log("GET CARD IMG SUIT", suit)
  const imageName = `${value}${suitMap[suit]}.png`;
  console.log("GET CARD IMG NAME", imageName)

  return `/deck/${imageName}`;
};