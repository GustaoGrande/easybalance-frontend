import { useState } from "react"
import { Table } from "@mui/joy"

import type { FixedExpenseInterface, MonthlyFixedExpenseType } from "../../types/InterfaceProps"
import { currencyFormatter, keyObjectRetriever } from "../../config"
import { paymentStatusPT } from "../../translation"
import { EyeLine } from "../eb-icons/SvgCollection"

import "./styles/fixedexpense-style.css"
import FixedExpenseDetailModal from "../modals/FixedExpenseDetailModal"

interface expenseTableProps{
    data: FixedExpenseInterface | undefined,
    setData: React.Dispatch<React.SetStateAction<FixedExpenseInterface | undefined>>
}

export default function ExpenseTableRender({data, setData}: expenseTableProps){

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [modalData, setModalData] = useState<MonthlyFixedExpenseType | undefined>(undefined)

    if (!data) return 'no data'

    return(
        <>
            <FixedExpenseDetailModal activated={openModal} setActivated={setOpenModal} monthlyFixedExpense={modalData} setState={setData} fixedExpenseData={data}/>

            <Table variant='plain' size='sm' hoverRow>

                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Categoria</th>
                        <th>Valor</th>
                        <th>Vencimento</th>
                        <th>Status</th>
                        <th style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center'}}>Visualizar</th>
                    </tr>
                </thead>

                <tbody>
                    {data.monthly_expenses.map(obj => {

                        return(
                        <tr>
                            <td>{obj.fixed_expense.name}</td>
                            <td>{obj.fixed_expense.category.name}</td>
                            <td>{currencyFormatter.format(parseFloat(obj.fixed_expense.value))}</td>
                            <td>{obj.due_date ? obj.due_date : '-'}</td>
                            <td>{keyObjectRetriever(obj.status, paymentStatusPT)}</td>
                            <td className="table-actions" onClick={() => {
                                setOpenModal(true)
                                setModalData(obj)
                            }}><EyeLine/></td>
                        </tr>
                        )
                    })}
                </tbody>

            </Table>
        </>
    )
}