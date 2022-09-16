import React from 'react'
import styles from '/styles/Tabs.module.css'
export default function Tabs({setToolType}) {

  return (
    <div className={styles.Tabs}>
      <div className={styles.Tab} onClick={()=>setToolType('Nomenclature')}>Nomenclature</div>
      <div className={styles.Tab} onClick={()=>setToolType('ClipCard')}>Clip card</div>
      <div className={styles.Tab} onClick={()=>setToolType('Puzzle')}>Puzzle</div>
    </div>
  )
}
