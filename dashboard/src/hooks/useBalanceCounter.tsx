import type { YearBalance } from "../components/charts/BaseChartTypes";
import { monthNamesPT } from "../translation";

export default function useBalanceCounter(balanceData: YearBalance[], year: number){

    let income_transactions: number[] = []
    let expense_transactions: number[] = []

    for(let month in monthNamesPT){

        const month_transactions = balanceData.filter(obj => (obj.year === year) && (obj.month == month))

        let incomeValueSum: number = 0
        let expenseValueSum: number = 0
        
        month_transactions.forEach(obj => {
            obj.transaction.forEach(transaction => {
                if (transaction.type === 'income') incomeValueSum += parseFloat(transaction.value);
                else expenseValueSum += parseFloat(transaction.value)
            })
        })

        income_transactions.push(parseFloat(incomeValueSum.toFixed(2)))
        expense_transactions.push(parseFloat(expenseValueSum.toFixed(2)))
    }

    return [income_transactions, expense_transactions]

}