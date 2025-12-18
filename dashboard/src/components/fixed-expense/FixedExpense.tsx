import { useEffect, useState } from "react"
import type { FixedExpenseInterface } from "../../types/InterfaceProps"
import Card from "../card/Card"
import { Button, Typography } from "@mui/joy"

import { BACKEND_URL, TRANSACTION_URI, keyObjectRetriever } from "../../config"
import { monthNamesPT } from "../../translation"
import ExpenseTableRender from "./ExpenseTableRender"
import FixedExpenseShowAllModal from "../modals/FixedExpenseShowAllModal"

const EXPENSE_URI = BACKEND_URL + TRANSACTION_URI + 'monthly-fixed-expense/this-month'

export default function FixedExpense(){

    const [expenses, setExpenses] = useState<FixedExpenseInterface>()
    const [activateModal, setActivateModal] = useState<boolean>(false)

    useEffect(() => {
        fetch(`${EXPENSE_URI}?actual_month=true`)
        .then(response => response.json())
        .then((data: FixedExpenseInterface) => {
            if (data){
                setExpenses(data)
            }
        })
    }, [])


    return(
        <>
            {activateModal && (<FixedExpenseShowAllModal activated={activateModal} setActivated={setActivateModal}/>)}

            <Card className="table-fixed-expenses-container">
                <header style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div>
                        <Typography level='title-sm'>Despesas Fixas</Typography>
                        <Typography level='body-sm'>{keyObjectRetriever(expenses?.month!, monthNamesPT)} - {expenses?.year}</Typography>
                    </div>

                    <Button variant="plain" size="sm" onClick={() => setActivateModal(true)}>Visualizar todos</Button>
                </header>

                <ExpenseTableRender data={expenses} setData={setExpenses}/>
            </Card>
        </>
    )
}