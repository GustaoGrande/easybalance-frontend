import { Input } from "@mui/joy"
import type { InputProps } from "../../../types/InterfaceProps"

export default function DateInput({value, setState}: InputProps){

    const todayDate = new Date()

    const maxDate = todayDate.toISOString()
    const maxDateStr = maxDate.slice(0, maxDate.lastIndexOf(':'))

    const minDate = new Date(`${todayDate.getFullYear() - 1}-01-01`).toISOString()
    const minDateStr = minDate.slice(0, minDate.lastIndexOf(':'))

    return(
        <div className="input__container">
            <label htmlFor="profit-date">Data da entrada</label>
            <Input
                size="sm"
                variant="solid"
                error={(new Date(value) > new Date(maxDate)) || (new Date(value) < new Date(minDate))}
                id="profit-date"
                type="datetime-local"
                onChange={(e) => setState(e.target.value)}
                slotProps={{input: {
                    min: minDateStr,
                    max: maxDateStr,
                }}}/>
        </div>
    )
}