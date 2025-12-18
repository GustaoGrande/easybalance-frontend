import type { ApexOptions } from "apexcharts"

export const CategoryLegendRender = ({labels, series}: {labels: ApexOptions['labels'], series: number[]}) => {

    const legendData: {tag: string, total: number}[] = []

    for(let id = 0; id <= labels!.length - 1; id++){
        legendData.push({
            tag: labels![id],
            total: series[id]
        })
    }

    return(
        <div className="category-legend__container">
            {legendData.map(label => {
                return(
                    <div key={label.tag} className="category-legend">
                        <div className="category-legend__ico">icone</div>
                        <div className="category-legend__title">{label.tag}</div>
                        <div className="category-legend__value">{label.total}</div>
                    </div>
                )
            })}
        </div>
    )
}