import React from "react";
import { useNavigate } from "react-router-dom";
import { VictoryPie, VictoryTheme } from "victory";
import styles from "./Stats.module.css"

export default function Stats(){
    const [totalGeral,setTotalGeral] = React.useState(0)
    const [dataAlfa,seDataAlfa] = React.useState([])
    const [dataGraph,setDataGraph] = React.useState([])
    React.useEffect(() => {
        async function getData() {
            const dados = await JSON.parse(localStorage.getItem("dados"))
            console.log(dados)
            const totalG = dados.reduce((acc,obj) => acc + Number(obj.total), 0)
            setTotalGeral(totalG)
            seDataAlfa(dados.sort((a,b) => {
                if(a.publicacao < b.publicacao){
                    return -1
                }
                if(a.publicacao > b.publicacao){
                    return 1
                }
                return 0
            }))
            console.log(dataAlfa)
            setDataGraph(dataAlfa.map(({publicacao,total}) => ({
                x:publicacao,
                y:total
            })))
        }
        getData()
    },[])
    const navigate = useNavigate()

    function handleBack(){
        navigate('/')
    }
    return(
        <div>
                        {/* <p onClick={handleBack}>Voltar</p>
                        <h1>Estatísticas</h1> */}
            <div className={styles.stats}>
                <div className={styles.info}>
                    <p>Total geral de publicações: {totalGeral}</p>
                    {
                        dataAlfa.map((publi) => (
                            <div>
                                Publicação: {publi.publicacao} - Quantidade: {publi.total}
                            </div>
                        ))
                    }
                </div>
                <div className={styles.graficos}>
                    <VictoryPie
                    innerRadius={50}
                    padAngle={5}
                    data={dataGraph}
                    theme={VictoryTheme.clean}
                    />
                </div>
            </div>
        </div>
    )
}