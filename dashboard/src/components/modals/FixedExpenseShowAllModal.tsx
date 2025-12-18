import { CircularProgress, Modal, ModalClose, Sheet, Typography, Table, Button } from "@mui/joy";
import type { modalProps, OffsetFixedExpense } from "../../types/InterfaceProps";
import { useEffect, useState } from "react";
import { BACKEND_URL, TRANSACTION_URI, keyObjectRetriever, currencyFormatter } from "../../config";
import { monthNamesPT, paymentStatusPT } from "../../translation";

const LIST_EXPENSES_URL: string = BACKEND_URL + TRANSACTION_URI + 'monthly-fixed-expense'

export default function FixedExpenseShowAllModal({activated, setActivated}: modalProps){

    const [fixedExpenses, setFixedExpenses] = useState<OffsetFixedExpense>()
    const [offset, setOffset] = useState<number>(0)
    const [loadMore, setLoadMore] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        if (loading){
            fetch(`${LIST_EXPENSES_URL}?offset=${offset}`)
            .then(response => response.json())
            .then((data: OffsetFixedExpense) => {

                if (!fixedExpenses){
                    setFixedExpenses(data)
                } else {
                    data.results = [...fixedExpenses.results, ...data.results]
                    setFixedExpenses(data)
                }
                setOffset(offset + 3)
                setLoading(false)
                setLoadMore(data.has_more)
            })
        }

    }, [offset, fixedExpenses, loading])

    

    return(
        <Modal
        open={activated}
        onClose={() => setActivated(false)}
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Sheet variant="outlined" sx={{padding: '10px', borderRadius: '6px', boxShadow: '0px 0px 11px grey', flex: 0.9, p: '10px', overflow: 'auto', maxHeight: '24rem'}}>
                <ModalClose/>
                {fixedExpenses ?
                <>{fixedExpenses.results.map(obj => {
                    return(
                    <Sheet key={`${obj.year}-${obj.month}`} variant="outlined" sx={{marginTop: '30px', marginBottom: '40px', p: '4px'}}>
                        <div className="table-fixed-expenses-container">
                            <header style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div>
                                    <Typography level='body-sm'>{keyObjectRetriever(obj.month, monthNamesPT)} - {obj.year}</Typography>
                                </div>
                            </header>

                            <Table variant='plain' size='sm' hoverRow>

                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Categoria</th>
                                        <th>Valor</th>
                                        <th>Vencimento</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {obj.monthly_expenses.map(monthly_expenses => {

                                        return(
                                        <tr>
                                            <td>{monthly_expenses.fixed_expense.name}</td>
                                            <td>{monthly_expenses.fixed_expense.category.name}</td>
                                            <td>{currencyFormatter.format(parseFloat(monthly_expenses.fixed_expense.value))}</td>
                                            <td>{monthly_expenses.due_date ? monthly_expenses.due_date : '-'}</td>
                                            <td>{keyObjectRetriever(monthly_expenses.status, paymentStatusPT)}</td>
                                        </tr>
                                        )
                                    })}
                                </tbody>
                            
                            </Table>
                        </div>
                    </Sheet>
                    )
                })}</>
                :
                <CircularProgress variant="plain" sx={{marginLeft: '50%', marginRight: '50%'}}/>
                }

                <Button disabled={!loadMore} loading={loading} onClick={() => setLoading(true)}>Carregar mais</Button>
                
            </Sheet>
        </Modal>
    )
}