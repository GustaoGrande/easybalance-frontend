import { useState, useEffect } from "react";
import Card from "../card/Card";
import Chart from "react-apexcharts"
import { BACKEND_URL, TRANSACTION_URI} from "../../config";
import type { MostCategorys } from "./BaseChartTypes";
import useCategoryChart from "../../hooks/useCategoryChart";
import { CategoryLegendRender } from "./CategoryLegendRender";
import { CategoryChartHeader } from "./CategoryChartHeader";

import "./styles/categorychart-style.css"
import { useQuery } from "@tanstack/react-query";

const ENDPOINT_URL = BACKEND_URL + TRANSACTION_URI + 'most-categorys'

async function getCategoryData(){
    const response = await fetch(ENDPOINT_URL)

    if (!response.ok){
        throw response.json()
    }
    
    return response.json()
}


export default function CategoryChart(){

    const [option, setOption] = useState<'income' | 'expense'>('income')

    const {data, isLoading, error} = useQuery<MostCategorys>({
        queryKey: ['chart', 'category'],
        queryFn: getCategoryData
    })

    if (isLoading) return <Card className="category-chart mid">carregando</Card>

    if (!data || error) return <Card className="category-chart mid">Erro ao recuperar dados</Card>

    if (data[`${option}`].length < 1) return(
        <Card className="category-chart mid">
            <CategoryChartHeader option={option} setState={setOption}/>
            <p>sem dados</p>
        </Card>
    )

    const [chartOptions, chartSeries] = useCategoryChart(data, option)

    return(
        <Card className="category-chart mid">
            <CategoryChartHeader option={option} setState={setOption}/>
            <Chart type="donut" options={chartOptions} series={chartSeries} height={'60%'}/>
            <CategoryLegendRender labels={chartOptions.labels} series={chartSeries}/>
        </Card>
    )
}

