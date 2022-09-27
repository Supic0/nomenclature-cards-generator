import React, {useContext} from 'react'
import Logo from '/assets/logo.svg'
import styles from '/styles/Header.module.css'
import { connexion } from "/contexts/Connected";

export default function Header() {
    const isConnected = useContext(connexion);

    return (
        <div className={styles.Header} onClick={isConnected.toggleValue}>
            <Logo/>
            <div>{isConnected ? "connecté":"Connexion"}</div>
            <div>Inscription</div>
        </div>
    )
}

