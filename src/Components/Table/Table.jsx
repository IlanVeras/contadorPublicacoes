import React from "react"
import Input from "../Input/Input"

export default function Table(){
    //contante estado que seta como os objetos dentro do seu array devem ser estruturados
    const [rows,setRows] = React.useState([
        {publicacao:"",codigo:"",total:0}
    ])

    React.useEffect(() => {
        localStorage.setItem('dados',JSON.stringify(rows))
    },[rows])


    //fução que envia dados e..
    function handleSubmit(e){
        e.preventDefault()
        console.log("Salvo")
        //..guarda eles no localStorage
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

    return(
        <section>
            <form onSubmit={handleSubmit}>
                <div>
                    {
                        rows.map((row,index) => (
                            <div key={index}>
                                <Input 
                                type="text"
                                title="publicação"
                                value={row.publicacao}
                                onChange={(e) => handleChange(e,index,'publicacao')}
                                />
                                <Input
                                type="text"
                                title="código"
                                onChange={(e) => handleChange(e,index,'codigo')}/>
                                <Input
                                type="number"
                                title="total"
                                onChange={(e) => handleChange(e,index, 'total')}/>
                                <span onClick={() => handleMinus(index)}>X</span>
                            </div>
                        ))
                    }
                </div>
                <button>Enviar</button>
            </form>
            <div><button onClick={handleMore}>+</button></div>
        </section>
    )
}