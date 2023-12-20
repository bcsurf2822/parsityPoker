import React from "react";

export default function UserNameAndChips({ user, chipCount, seatNumber }) {
  return (
    <div>
 <h4 className="text-center mb-3">{user}</h4> 
      <h6 className="text-center mb-3">${chipCount}</h6>
    </div>
  );
}
