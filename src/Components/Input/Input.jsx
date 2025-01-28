import React from "react";
import styles from './Input.module.css'

export default function Input({type,title,value,onChange}){
    
    return(
        <div className={styles.input}>
            <input
            type={type}
            name={title}
            placeholder={title}
            value={value}
            onChange={onChange}
            ></input>
        </div>
    )
}