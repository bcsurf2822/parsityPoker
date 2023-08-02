export const convertRank = rank => {
  const rankMapping = { 'A': 'A', 'K': 'K', 'Q': 'Q', 'J': 'J' };
  return rankMapping[rank] || rank;
};

export const convertSuit = suit => {
  const suitMapping = { 'clubs': 'C', 'diamonds': 'D', 'hearts': 'H', 'spades': 'S' };
  return suitMapping[suit];
};