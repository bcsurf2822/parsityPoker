import React from "react";

export default function UserNameAndChips({ user, chipCount, seatNumber , isDealer, isCurrentPlayer}) {
  return (
    <div>
 <h4 className="text-center mb-3">{user}</h4> 
      <h6 className="text-center mb-3">${chipCount}</h6>
      <h6 className="text-center mb-3"> Dealer: {isDealer ? 'Yes' : 'No'} | Current Player: {isCurrentPlayer ? 'Yes' : 'No'} </h6>
    </div>
  );
}
