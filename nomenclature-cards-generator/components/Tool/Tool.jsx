import React from 'react'
import NomenclatureTool from './NomenclatureTool';
import ClipCardTool from './ClipCardTool';
import PuzzleTool from './PuzzleTool';
import styles from "/styles/Tool.module.css"

export default function Tool({ toolType }) {

    const renderSwitch = () => {
        switch (toolType) {
            case 'Nomenclature':
                return <NomenclatureTool />;
                case 'ClipCard':
                return <ClipCardTool />;
                case 'Puzzle':
                return <PuzzleTool />;
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
