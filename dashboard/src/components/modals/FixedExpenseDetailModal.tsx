import { Button, Modal, ModalClose, Sheet, Typography } from "@mui/joy"
import type { fixedExpenseDetailProps, FixedExpenseInterface, modalProps} from "../../types/InterfaceProps"
import { BACKEND_URL, currencyFormatter, keyObjectRetriever, TRANSACTION_URI } from "../../config"
import { monthNamesPT, paymentStatusPT } from "../../translation"


const PATCH_ENDPOINT = BACKEND_URL + TRANSACTION_URI + 'monthly-fixed-expense'


async function payFixedExpenseFetch(objectID: number){
    const response = await fetch(`${PATCH_ENDPOINT}/${objectID}`, {
        method: 'PATCH'
    })

    return response.ok
}

function updateExpenseDataStatus(expenseArray: FixedExpenseInterface, objectID: number){
    const newArray = expenseArray.monthly_expenses.map(monthly_obj => {
        if (objectID !== monthly_obj.id) return monthly_obj;

        monthly_obj.status = 'CONFIRMED'
        return monthly_obj
    })

    const newExpense = expenseArray
    newExpense.monthly_expenses = newArray

    return newExpense
}


export default function FixedExpenseDetailModal({activated, setActivated, monthlyFixedExpense, setState, fixedExpenseData}: modalProps & fixedExpenseDetailProps){

    if (!monthlyFixedExpense) return null

    const [year, month, day] = monthlyFixedExpense.date.split('-')

    return(
        <Modal
        open={activated} 
        onClose={() => setActivated(false)}
        sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        >
            <Sheet variant="outlined" sx={{padding: '10px', borderRadius: '6px', boxShadow: '0px 0px 11px grey', flex: 0.3}}>
                <ModalClose/>

                <Typography level="title-lg" textColor={'inherit'}>{monthlyFixedExpense.fixed_expense.name}</Typography>
                <Typography level="title-md" textColor={'inherit'}>{keyObjectRetriever(month, monthNamesPT)} - {year}</Typography>

                <Typography level="body-sm">{monthlyFixedExpense.fixed_expense.description}</Typography>

                <div style={{marginTop: 10, marginBottom: 10}}>
                    <div style={{display: 'grid', gridTemplateColumns: '120px 100px', alignItems: 'center'}}>
                        <Typography level="body-md">Categoria:</Typography>
                        <Typography level="body-sm">{monthlyFixedExpense.fixed_expense.category.name}</Typography>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '120px 100px', alignItems: 'center'}}>
                        <Typography level="body-md">Valor:</Typography>
                        <Typography level="body-sm">{currencyFormatter.format(parseFloat(monthlyFixedExpense.fixed_expense.value))}</Typography>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '120px 100px', alignItems: 'center'}}>
                        <Typography level="body-md">Status:</Typography>
                        <Typography level="body-sm">{keyObjectRetriever(monthlyFixedExpense.status, paymentStatusPT)}</Typography>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: '120px 100px', alignItems: 'center'}}>
                        <Typography level="body-md">Vencimento:</Typography>
                        <Typography level="body-sm">{monthlyFixedExpense.due_date ? monthlyFixedExpense.due_date : '-'}</Typography>
                    </div>
                </div>

                <div>
                    <Button variant="solid" onClick={async () => {

                        const success = await payFixedExpenseFetch(monthlyFixedExpense.id)
                        
                        if (success){
                            const newData = updateExpenseDataStatus(fixedExpenseData, monthlyFixedExpense.id);
                            setState(newData)
                            setActivated(false)
                        } else {
                            alert('erro ao pagar divida fixa')
                        }


                    }}>Alterar para PAGO</Button>
                </div>

            </Sheet>
        </Modal>
    )
}