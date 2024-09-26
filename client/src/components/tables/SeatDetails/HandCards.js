import React from 'react';
import { getCards } from '../../../actions/getCards';
import SampleCards from './CardBack';
import { getCardColor } from '../../../actions/getCardColor';

export default function HandCards({ cards }) {

  return (
    <div className="s-card-container">
      {cards.length > 0 ? (
        cards.map((card, index) => (
          <img key={index} src={getCards(card)} alt={`Card ${index + 1} ${card}`} />
        ))
      ) : (
        <>
{SampleCards}

        </>
      )}
    </div>
  );
}
