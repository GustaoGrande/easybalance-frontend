import CategoryChart from './components/charts/CategoryChart'
import YearlyBalanceChart from './components/charts/YearlyBalanceChart'
import { Income } from './components/profit-card/ProfitIncomeCard'
import { Expense } from './components/profit-card/ProfitExpenseCard'
import FixedExpense from './components/fixed-expense/FixedExpense'
import './App.css'


export default function App(){
    return(
        <div className='content'>

            <div className='header-cards__container'>
                <Income/>
                <Expense/>
            </div>

            <main>

                <div className='fixed-expense__container'>
                    <FixedExpense/>
                </div>

                <div className='charts__container'>
                    <YearlyBalanceChart/>

                    <CategoryChart/>
                </div>

            </main>

        </div>
    )
}