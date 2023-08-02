const cardToFilename = (rank, suit) => {
  let rankName;
  switch (rank) {
    case "a":
      rankName = "A";
      break;
    case "j":
      rankName = "J";
      break;
    case "q":
      rankName = "Q";
      break;
    case "k":
      rankName = "K";
      break;
    case "10":
      rankName = "T";
      break;
    case "9":
      rankName = "9";
      break;
    case "8":
      rankName = "8";
      break;
    case "7":
      rankName = "7";
      break;
    case "6":
      rankName = "6";
      break;
    case "5":
      rankName = "5";
      break;
    case "4":
      rankName = "4";
      break;
    case "3":
      rankName = "3";
      break;
    case "2":
      rankName = "2";
      break;
      default:
        rankName = rank.toUpperCase();
  }
  let suitName;
  switch (suit) {
    case "spades":
      suitName = "Spades";
      break;
    case "hearts":
      suitName = "Hearts";
      break;
    case "diamonds":
      suitName = "Diamonds";
      break;
    case "clubs":
      suitName = "Clubs";
      break;
    default:
      suitName = "";
  }

  return `${rankName}${suitName}.png`;
};

export default cardToFilename

