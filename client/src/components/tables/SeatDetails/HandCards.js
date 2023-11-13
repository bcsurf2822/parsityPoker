import React from 'react'
import { getCards } from '../../../actions/getCards'

export default function HandCards({cards}) {
  return (
    <>
    {cards.map((card, index) => (
      <img key={index} src={getCards(card)} alt={`Card ${index + 1} ${card}`} />
    ))}
  </>
  )
}
