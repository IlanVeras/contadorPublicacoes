import React from "react";
import styles from './Input.module.css'

export default function Input({type,title,value,onChange,backColor}){

    React.useEffect(() => {
        if(value === ''){
            value = "DIGITE ALGO"
        }
    },[value])
    
    return(
        <div className={styles.container}>
            <input
            type={type}
            name={title}
            placeholder={title}
            value={value}
            onChange={onChange}
            className={`${styles.input} ${title == 'código' && styles.codeForm}`}
            style={{backgroundColor: `${backColor}`}}
            ></input>
        </div>
    )
}