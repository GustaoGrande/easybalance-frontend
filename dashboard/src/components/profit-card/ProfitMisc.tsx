import type { ProfitMiscProps } from "./ProfitInterfaces"

const percentFormatter = Intl.NumberFormat('pt-BR', {
    style: 'percent',
})

export default function ProfitMisc({actual_data, previous_data, misc_type}: ProfitMiscProps){

    if (!actual_data || !previous_data) return null

    const diffPercent: number = (actual_data - previous_data) / previous_data

    if (misc_type == 'expense') return <ExpenseMisc diffPercent={diffPercent}/>

    return <IncomeMisc diffPercent={diffPercent}/>
}

const ExpenseMisc = ({diffPercent}: {diffPercent: number}) => {

    const text1: string = diffPercent > 0 ? 'Cuidado, há um aumento de ' : 'Continue assim! houve uma baixa de '

    return(
        <div className="profit-growth">
            <p className="growth-text">
                {text1}
                <span className={`growth-value ${diffPercent < 0 ? 'positive' : 'negative'}`}>{percentFormatter.format(diffPercent)} </span>
                nos gastos em relação ao mês passado</p>
        </div>
    )
}

const IncomeMisc = ({diffPercent}: {diffPercent: number}) => {

    const text1: string = diffPercent > 0 ? 'Um aumento de ' : 'Uma baixa de '

    return(
        <div className="profit-growth">
            <p className="growth-text">
                {text1}
                <span className={`growth-value ${diffPercent > 0 ? 'positive' : 'negative'}`}>{percentFormatter.format(diffPercent)} </span>
                nos lucros em relação ao mês passado
            </p>
        </div>
    )
}