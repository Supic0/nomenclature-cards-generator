import React from 'react'
import Logo from '/assets/logo.svg'
import styles from '/styles/Header.module.css'

export default function Header() {

    return (
        <div className={styles.Header}>
            <Logo/>
            <div>Connexion</div>
            <div>Inscription</div>
        </div>
    )
}

