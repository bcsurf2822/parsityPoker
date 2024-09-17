import React from 'react';
import { getCards } from '../../../actions/getCards';
import SampleCards from '../../pages/sampleWork/SampleCards';

export default function HandCards({ cards }) {
  const cardStyle = {
    width: '50px',
    height: '70px',
    margin: '0 5px',
    backgroundColor: 'gray',
    border: '1px solid black'
  };

  const cardPlaceholder = (
    <div className="card-placeholder" style={cardStyle}></div>
  );

  return (
    <div className="hand-cards-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {cards.length > 0 ? (
        cards.map((card, index) => (
          <img key={index} src={getCards(card)} alt={`Card ${index + 1} ${card}`} style={cardStyle} />
        ))
      ) : (
        <>
          {cardPlaceholder}
          {cardPlaceholder}

        </>
      )}
    </div>
  );
}
