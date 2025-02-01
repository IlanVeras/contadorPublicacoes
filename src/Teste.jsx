import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Teste.module.css"
import Header from "./Components/Helper/Header/Header"
import Input from "./Components/Input/Input"



export default function Teste(){
    const [rows,setRows] = React.useState([{ publicacao: "", codigo: "", total: 0 }])
    const navigate = useNavigate()

    /*Problemas:
    1 nem todos os dados do local storage aparecem automáticamnte*/

    //função de efeito que recupera dados da planilha
    React.useEffect(() => {
        function handleStorage(){
            const d = JSON.parse(localStorage.getItem("dados"))
            const f = d.map((item) => ({
                ...item,
                total: Number(item.total)
            }))
            console.log(f)
            if(f){
                setRows(f)
            }
        }
        handleStorage()
    },[])

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
                                        value={row.codigo}
                                        onChange={(e) => handleChange(e,index,'codigo')}/>
                                        <Input
                                        type="number"
                                        title="total"
                                        value={row.total}
                                        onChange={(e) => handleChange(e,index, 'total')}
                                        backColor="#c6e3ff"/>
                                        <span onClick={() => handleMinus(index)} className={styles.apagar}>X</span>
                                    </div>
                                ))
                        }
                        <div onClick={handleMore} className={styles.btnMore}>Adicionar</div>
                        <button className={styles.btnSend} type="submit">Enviar</button>
                </form>
            </div>
        </div>
    )
}