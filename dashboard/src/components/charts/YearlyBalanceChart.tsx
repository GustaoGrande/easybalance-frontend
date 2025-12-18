import { useState } from "react";
import Card from "../card/Card";
import Chart from "react-apexcharts"
import type { YearBalance } from "./BaseChartTypes";
import { BACKEND_URL, TRANSACTION_URI, currencyFormatter } from "../../config";
import useBalanceCounter from "../../hooks/useBalanceCounter";
import { YearsMenu } from "./YearsMenuRender";
import { useQuery } from "@tanstack/react-query";
import "./styles/yearlychart-style.css"

const yearMonths = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro']

const chartOptions = {
    chart: {
        id: "basic-chart",
        dropShadow: {
            enabled: true
        },
        toolbar: {
            show: false
        }
    },
    xaxis: {
        categories: yearMonths,
    },
    yaxis: {
        labels: {
            formatter: (value: number) => currencyFormatter.format(value)
        }
    },
    dataLabels: {
        enabled: false
    }
}

const ENDPOINT = BACKEND_URL + TRANSACTION_URI

async function getYearlyData(){
    const response = await fetch(ENDPOINT)

    if (!response.ok){
        throw response.json()
    }

    return response.json()
}


export default function YearlyBalanceChart(){

    const [year, setYear] = useState<number>(0)
    const [availableYears, setAvailableYears] = useState<number[]>([])

    const {data, isLoading, error} = useQuery<YearBalance[]>({
        queryKey: ['chart', 'yearly'],
        queryFn: async () => {
            const response: YearBalance[] = await getYearlyData()
            const availableYearsSet = new Set<number>()

            response.forEach(transaction => {
                availableYearsSet.add(transaction.year)
            })

            const yearsArray = Array.from(availableYearsSet)

            setAvailableYears(yearsArray)

            if (yearsArray.length > 0) setYear(yearsArray[0]);

            return (response)
        }

    })


    if (isLoading) return <Card className="giant">carregando</Card>

    if (!data || error) return <Card className="giant">Erro ao carregar dados</Card>

    const [income_transactions, expense_transactions] = useBalanceCounter(data, year)

    const chartSeries = [
    {
        name: "Entradas",
        data: income_transactions,
        color: "#00e396d9",
    },
    {
        name: "Saidas",
        data: expense_transactions,
        color: "#b46868ff"
    },
]

    return(
        <Card className="yearly-chart giant">
            <YearsMenu years={availableYears} setState={setYear} activeYear={year}/>
            <Chart options={chartOptions} series={chartSeries} type="bar" height='90%'/>
        </Card>
    )
}
