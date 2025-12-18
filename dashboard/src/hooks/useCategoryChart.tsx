import type { MostCategorys } from "../components/charts/BaseChartTypes"
import type { ApexOptions } from "apexcharts"

export default function useCategoryChart(apiData: MostCategorys, option: 'income' | 'expense'): [ApexOptions, number[]]{

    const chartOptions: ApexOptions = {
        chart:{
            id: "basic-donut",
        },
        labels: [],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        }
    }

    let chartSeries: number[] = []


    for(let category of apiData[option]){

        chartOptions.labels?.push(
            category.category__name
        )

        chartSeries?.push(category.total_count)
    }


    return [chartOptions, chartSeries]
}