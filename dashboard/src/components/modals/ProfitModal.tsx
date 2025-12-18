import { useState } from "react"
import SelectCategory from "./inputs/SelectCategory"
import DateInput from "./inputs/DateInput"
import ValueInput from "./inputs/ValueInput"
import {Modal, ModalClose, Sheet, Typography, Button} from "@mui/joy"
import type { modalProps, profitProps } from "../../types/InterfaceProps"
import DescriptionInput from "./inputs/DescriptionInput"
import Cookie from 'js-cookie'

import { BACKEND_URL, TRANSACTION_URI } from "../../config"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import "./styles/profitmodal-style.css"

type profitPayload = {
    description: string,
    value: string,
    category: string,
    date: string,
}

type createNewProfit = {
    payload: profitPayload,
    fetchURL: string
}

async function createNewProfit(newProfit: createNewProfit){

    const response = await fetch(newProfit.fetchURL, {
        method: 'POST',
        headers: {'content-type': 'application/json', 'X-CSRFToken': `${Cookie.get('csrftoken')}`},
        body: JSON.stringify(newProfit.payload)
    })

    if (!response.ok){
        throw response.json()
    }

    return response.json()
}

export default function ProfitModal({activated, setActivated, profitType, setNotify}: modalProps & profitProps){

    const [value, setValue] = useState<number>(0)
    const [description, setDescription] = useState<string>('')
    const [category, setCategory] = useState<string>('unknown')
    const [date, setDate] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: createNewProfit,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['profit', profitType]});
            queryClient.invalidateQueries({queryKey: ['chart', 'category']});
            queryClient.invalidateQueries({queryKey: ['chart', 'yearly']});
            setActivated(false)
            if (setNotify) setNotify(true);
        },
        onError: () => setError(true)
    })

    const fetchURL = BACKEND_URL + TRANSACTION_URI

    const profitString = profitType === 'income' ? 'entrada' : 'saída'

    return(
        <Modal open={activated} onClose={() => setActivated(false)} sx={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <div className="sheet-modal__container">
                <ModalClose variant="plain" sx={{m: 0}}/>
                <Sheet variant="outlined" sx={{padding: '10px', borderRadius: '6px', boxShadow: '0px 0px 11px grey'}}>
                    <Typography level="title-lg" textColor={'inherit'}>Registrar {profitString}</Typography>
                    <Typography level="title-sm" textColor={'inherit'} sx={{fontSize: '0.7rem', maxWidth: '32rem', marginBottom: '20px'}}>É recomendado que sempre que houver uma {profitString} em sua vida financeira, adicione na plataforma para conseguir manter controle.</Typography>

                    {error && (<Typography variant="plain" level="body-xs" sx={{display: 'flex', justifyContent: 'center'}} color="danger">Ocorreu um erro. Tente novamente</Typography>)}

                    <ValueInput value={value} setState={setValue}/>
                    <SelectCategory setState={setCategory} value={category} fetchURL={fetchURL + profitType + '/categorys'}/>
                    <DateInput setState={setDate} value={date}/>

                    <DescriptionInput value={description} setState={setDescription}/>

                    <Sheet sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '8px'}}>
                        <Button disabled={mutation.isPending} loading={mutation.isPending} size="sm" onClick={() => {
                            try{
                                mutation.mutate({
                                fetchURL: fetchURL + `${profitType}/`,
                                payload: {
                                    category,
                                    date: new Date(date).toISOString(),
                                    description,
                                    value: `${value / 100}`
                                }
                                })
                            } catch(err){
                                setError(true)
                            }
                        }}>Registrar transação</Button>
                    </Sheet>
                </Sheet>
            </div>
        </Modal>
    )
}

