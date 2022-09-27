import React, { useContext } from 'react'
import dynamic from 'next/dynamic';
import { connexion } from '/contexts/Connected';

const DownloadButton = dynamic(
  () => import('/components/ListCart/DownloadButton.jsx'),
  { ssr: false }
);

export default function ListCart({ listOfCards, setListOfCards }) {

  const isConnected = useContext(connexion);

  const supprimer = (id) => {
    console.log('suppr');
    setListOfCards(current => {
      return current.filter((element, index) => {
        return index !== id;
      })
    })
  }

  return (
    <div>
      <div>
        {listOfCards.map((card, index) =>
          // Only do this if items have no stable IDs
          <div key={index}>
            <img src={card.vignette} style={{width:"200px"}}/>
            <p onClick={() => supprimer(index)}>&#10060;</p>
          </div>
        )}
      </div>
      { listOfCards[0] &&
      <div>
        {isConnected ? <DownloadButton listOfCards={listOfCards} /> :
          <div> Télécharger!</div>}
        <div>Imprimer</div>
      </div>}
    </div>
  )
}
