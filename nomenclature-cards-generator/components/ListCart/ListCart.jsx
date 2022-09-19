import React from 'react'

export default function ListCart({listOfCards}) {
  return (
    <div>
      <div>
      {listOfCards.map((card, index) =>
        // Only do this if items have no stable IDs
        <div key={index}>
          <img src={card.vignette} />
          <p>&#10060;</p>
        </div>
      )}
      </div>
      <div>
        <div>Télécharger</div>
        <div>Imprimer</div>
      </div>
    </div>
  )
}
