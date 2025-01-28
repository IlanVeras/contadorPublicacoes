import React from "react"
import styles from "./Publication.module.css"

export default function Publication({publi,quantidade, code}){
    return(
        <div className={styles.container}>
            <p className={styles.publiName}>{publi}  <span className={styles.codePubli}>| {code} |</span></p>
            <p>Quantidade: {quantidade}</p>
        </div>
    )
}