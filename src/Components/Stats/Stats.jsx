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
            //total geral
            setTotalGeral(totalG)
            //dados em ordem alfabética
            seDataAlfa(dados.sort((a,b) => {
                if(a.publicacao < b.publicacao){
                    return -1
                }
                if(a.publicacao > b.publicacao){
                    return 1
                }
                return 0
            }))
            //dados para o gráfico
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
            const data = localStorage.getItem("dados")
            if(data){
                setTimeout(() => {
                    console.log(window.location)
                    if(window.location.pathname === '/stats'){
                        window.print()
                    }
                },2000)
            }
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
                <Jw/>
            </div>
        </div>
    )
}