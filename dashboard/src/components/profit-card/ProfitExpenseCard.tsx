import { useState } from "react"
import { Snackbar, Button } from "@mui/joy"

import ProfitModal from "../modals/ProfitModal"
import ProfitMisc from "./ProfitMisc"
import Card from "../card/Card"

import { TrendingDown } from "../eb-icons/SvgCollection"
import type { incomeExpenseType } from "./ProfitInterfaces"

import { BACKEND_URL, TRANSACTION_URI, currencyFormatter } from "../../config"

import { useQuery } from "@tanstack/react-query"

import "./styles/profitcard-style.css"


const EXPENSE_URL: string = BACKEND_URL + TRANSACTION_URI + 'expense'

async function fetchExpenseMonthly(){
    const response = await fetch(`${EXPENSE_URL}/monthly`)
    return response.json()
}

export const Expense = () => {

    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [notify, setNotify] = useState<boolean>(false)

    const {data, isLoading, error} = useQuery<incomeExpenseType>({
        queryKey: ['profit', 'expense'],
        queryFn: fetchExpenseMonthly,
    })

    if (isLoading) return <Card className="profit-card">carregando</Card>

    if (!data || error) return <Card className="profit-card">Erro ao carregar dados</Card>

    return(
        <>  
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} variant="soft" color="success" autoHideDuration={5000} open={notify} onClose={() => setNotify(false)}>Transação registrada com sucesso!</Snackbar>
            <ProfitModal activated={activeModal} setActivated={setActiveModal} profitType="expense" setNotify={setNotify}/>

            <Card className="profit-card">
                <div className='profit-title'>
                    SAÍDA
                </div>

                <div className='profit-value'>
                    {currencyFormatter.format(data.this_month ? data.this_month : 0)}
                </div>

                <div className="action-buttons__container">
                    <div className="profit-icon expense">
                        <TrendingDown fill="rgba(238, 44, 30, 1)" width={24} height={24}/>
                    </div>
                    <Button sx={{padding: '0px', fontSize: 10}} color="danger" size="sm" variant="plain" onClick={() => setActiveModal(true)}>
                        <p>Registrar saída</p>
                    </Button>
                </div>

                <ProfitMisc actual_data={data.this_month} previous_data={data.last_month} misc_type="expense"/>
            </Card>
        </>
    )
}