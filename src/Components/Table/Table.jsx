import React from "react"
import Input from "../Input/Input"
import { useNavigate } from "react-router-dom"
import styles from "./Table.module.css"


export default function Table(){
    //contante estado que seta como os objetos dentro do seu array devem ser estruturados
    const [rows,setRows] = React.useState([{ publicacao: "", codigo: "", total: 0 }])
    const navigate = useNavigate()



    //fução que envia dados e..
    function handleSubmit(e){
        e.preventDefault()
        const rowsLowered = rows.map((row) => ({
            ...row,
            publicacao: row.publicacao.toLowerCase(),
            codigo: row.codigo.toLowerCase()
        }))
        localStorage.setItem('dados',JSON.stringify(rowsLowered))
        //leva para a página de estatísticas
        navigate("/stats")
    }

    //função que muda o valor do elemento Input
    //e => elemento em si
    //index => index do elemento selecionado
    //field => objeto[index].field
    function handleChange(e,index,field){
        const updatedRows = [...rows]
        updatedRows[index][field] = e.target.value
        setRows(updatedRows)
    }

    //adiciona mais uma tabela vazia
    function handleMore(){
        setRows((prevRows) => [...prevRows, {publicacao: "", codigo: "", total: 0}]);
    }

    //retira uma tabela específica usando o index
    function handleMinus(index){
        const updatedRows = [...rows]
        updatedRows.splice(index,1) //remove uma linha específica
        setRows(updatedRows)
    }

    function handleClearAll(){
        setRows([{ publicacao: "", codigo: "", total: 0 }])
        localStorage.removeItem("dados")
    }

    return(
        <section>
            <form onSubmit={handleSubmit}>
                <div className={styles.containerForm}>
                    {
                        rows.map((row,index) => (
                            <div key={index}>
                                <Input 
                                type="text"
                                title="publicação"
                                value={row.publicacao}
                                onChange={(e) => handleChange(e,index,'publicacao')}
                                backColor="#98cdff"
                                />
                                <Input
                                type="text"
                                title="código"
                                onChange={(e) => handleChange(e,index,'codigo')}/>
                                <Input
                                type="number"
                                title="total"
                                onChange={(e) => handleChange(e,index, 'total')}
                                backColor="#98cdff"/>
                                <span onClick={() => handleMinus(index)} className={styles.apagar}>X</span>
                            </div>
                        ))
                    }
                </div>
                <button className={styles.btn}>Enviar</button>
            </form>
            <div><button onClick={handleMore}>+</button></div>
        </section>
    )
}