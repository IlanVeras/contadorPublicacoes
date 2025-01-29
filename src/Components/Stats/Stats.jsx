import React from "react";
import { VictoryPie, VictoryTheme } from "victory";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import styles from "./Stats.module.css"
import Publication from "../Publication/Publication";
import Jw from "../Jw/Jw";

export default function Stats(){
    const [totalGeral,setTotalGeral] = React.useState(0)
    const [dataAlfa,seDataAlfa] = React.useState([])
    const [dataGraph,setDataGraph] = React.useState([])
    const [isDataLoaded,setIsDataLoaded] = React.useState(false)

    React.useEffect(() => {
        async function getData() {
            const dados = await JSON.parse(localStorage.getItem("dados"))
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
            setIsDataLoaded(true)       
        }
        getData()
    },[])

    React.useEffect(() => {
        function baixarPDF(){
            window.print()
        }
        baixarPDF()
    },[])

    function capitalizeFirstLetter(val) {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }
    return(
        <div id="stats-container">
            <div className={styles.stats}>
                <div className={styles.info}>
                    <div className={styles.totG}>
                        <p>Total geral de publicações: <b>{totalGeral}</b></p>
                    </div>
                    {
                        dataAlfa.map((publi) => (
                            <Publication publi={capitalizeFirstLetter(publi.publicacao)} code={publi.codigo} quantidade={publi.total} className={styles.paragraphPubli}
                            />
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