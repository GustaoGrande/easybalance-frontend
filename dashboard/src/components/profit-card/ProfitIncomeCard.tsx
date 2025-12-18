import { useState } from "react"
import { Snackbar, Button } from "@mui/joy"

import ProfitModal from "../modals/ProfitModal"
import ProfitMisc from "./ProfitMisc"
import Card from "../card/Card"

import { TrendingUp } from "../eb-icons/SvgCollection"
import type { incomeExpenseType } from "./ProfitInterfaces"

import { BACKEND_URL, TRANSACTION_URI, currencyFormatter } from "../../config"

import { useQuery } from "@tanstack/react-query"

import "./styles/profitcard-style.css"

const INCOME_URL: string = BACKEND_URL + TRANSACTION_URI + 'income'

async function fetchIncomeMonthly(){

    const response = await fetch(`${INCOME_URL}/monthly`)

    return response.json()
}

export const Income = () => {

    const [activeModal, setActiveModal] = useState<boolean>(false)
    const [notify, setNotify] = useState<boolean>(false)

    const {data, isLoading, error} = useQuery<incomeExpenseType>({
        queryKey: ['profit', 'income'],
        queryFn: fetchIncomeMonthly
    })

    if (isLoading) return <Card className="profit-card">carregando</Card>

    if (!data || error) return <Card className="profit-card">Erro ao carregar dados</Card>

    return(
        <>  
            <Snackbar anchorOrigin={{vertical: "top", horizontal: "center"}} variant="soft" color="success" autoHideDuration={5000} open={notify} onClose={() => setNotify(false)}>Entrada registrada com sucesso!</Snackbar>
            <ProfitModal activated={activeModal} setActivated={setActiveModal} profitType="income" setNotify={setNotify}/>

            <Card className="profit-card">
                <div className='profit-title'>
                    ENTRADA
                </div>

                <div className='profit-value'>
                    {currencyFormatter.format(data.this_month ? data.this_month : 0)}
                </div>

                <div className="action-buttons__container">
                    <div className="profit-icon income">
                        <TrendingUp fill="rgba(147, 241, 126, 1)" width={24} height={24}/>
                    </div>
                    <Button sx={{padding: '0px', fontSize: '0.7rem'}} color="success" size="sm" variant="plain" onClick={() => setActiveModal(true)}>
                        <p>Registrar entrada</p>
                    </Button>
                </div>

                <ProfitMisc actual_data={data.this_month} previous_data={data.last_month} misc_type="income"/>
            </Card>
        </>
    )
}