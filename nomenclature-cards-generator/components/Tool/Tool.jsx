import React from 'react'
import NomenclatureTool from './NomenclatureTool';
import ClipCardTool from './ClipCardTool';
import PuzzleTool from './PuzzleTool';
import styles from "/styles/Tool.module.css"

export default function Tool({ toolType, setListOfCards, listOfCards }) {

    const renderSwitch = () => {
        switch (toolType) {
            case 'Nomenclature':
                return <NomenclatureTool  setListOfCards={setListOfCards} listOfCards={listOfCards}/>;
                case 'ClipCard':
                return <ClipCardTool  setListOfCards={setListOfCards} listOfCards={listOfCards}/>;
                case 'Puzzle':
                return <PuzzleTool   setListOfCards={setListOfCards} listOfCards={listOfCards}/>;
            default:
                return "default"
        }
    }

    return (
        <div className={styles.tool}> 
            {renderSwitch()}
        </div>
    )
}
