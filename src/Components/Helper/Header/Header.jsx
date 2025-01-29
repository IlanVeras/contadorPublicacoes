import React from "react";
import styles from "./Header.module.css"

export default function Header({title}){
    return(
        <div className={styles.container}>
            <h1>{title}</h1>
        </div>
    )
}