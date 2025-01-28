import React from "react";
import { useNavigate } from "react-router-dom";
import { VictoryPie, VictoryTheme } from "victory";
import styles from "./Stats.module.css"
import Publication from "../Publication/Publication";
import Jw from "../Jw/Jw";

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
            const dadosTransformados = dados.map((item) => ({
                x: item.publicacao, // Rótulo (label)
                y: parseInt(item.total, 10), // Valor (numérico)
              }));
            setDataGraph(dadosTransformados)
            console.log("DataGraph")    
            console.log(dataGraph)          
        }
        getData()
    },[])
    const navigate = useNavigate()

    function handleBack(){
        navigate('/')
    }

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    return(
        <div>
            <div className={styles.stats}>
                <div className={styles.info}>
                    <div className={styles.totG}>
                        <p>Total geral de publicações: <b>{totalGeral}</b></p>
                    </div>
                    {
                        dataAlfa.map((publi) => (
                            <Publication publi={capitalizeFirstLetter(publi.publicacao)} code={publi.codigo} quantidade={publi.total} className={styles.paragraphPubli}/>
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
                <Jw/>
            </div>
        </div>
    )
}