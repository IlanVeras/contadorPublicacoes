import React from "react"
import Input from "../Input/Input"
import { useNavigate } from "react-router-dom"
import styles from "./Table.module.css"
import Header from "../Helper/Header/Header"


export default function Table(){
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

    // function handleClearAll(){
    //     setRows([{ publicacao: "", codigo: "", total: 0 }])
    //     localStorage.removeItem("dados")
    // }
    
    return(
        <div>
            <Header title="Contador de publicações"></Header>
            <div className={styles.container}>
                <form onSubmit={handleSubmit}>
                    {
                                rows.map((row,index) => (
                                    <div key={index} className={styles.table}>
                                        <Input
                                        type="text"
                                        title="publicação"
                                        value={row.publicacao}
                                        onChange={(e) => handleChange(e,index,'publicacao')}
                                        backColor="#c6e3ff"
                                        />
                                        <Input
                                        type="text"
                                        title="código"
                                        onChange={(e) => handleChange(e,index,'codigo')}/>
                                        <Input
                                        type="number"
                                        title="total"
                                        onChange={(e) => handleChange(e,index, 'total')}
                                        backColor="#c6e3ff"/>
                                        <span onClick={() => handleMinus(index)} className={styles.apagar}>X</span>
                                    </div>
                                ))
                        }
                        <button className={styles.btnSend}>Enviar</button>
                </form>
                <div className={styles.containerBtnMore}><button onClick={handleMore} className={styles.btnMore}>+</button></div>
            </div>
        </div>
    )
}