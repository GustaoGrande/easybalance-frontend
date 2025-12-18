import type { InputProps } from "../../../types/InterfaceProps"
import { currencyFormatter } from "../../../config"

function addNumeric(value: string, setState: React.Dispatch<React.SetStateAction<number>>){

    const testNumber = value.replace(/\D/g, '')

    console.log(parseInt(testNumber))

    if (testNumber){
        setState(prev => parseInt(prev + testNumber))
    }

}

export default function ValueInput({value, setState}: InputProps){

    return(
        <div className="input__container center">
            <input type="text" id="profit-value" value={currencyFormatter.format(value / 100)} onKeyDown={(e) =>{
                if (e.key === 'Backspace'){
                    setState((prev: number) => {
                        const newValue = `${prev}`.split('')
                        newValue.pop()

                        if (newValue.length === 0){
                            newValue.push('0')
                        }

                        return parseInt(newValue.join(''))
                    })

                } else {
                    addNumeric(e.key, setState)
                }
            }} />
        </div>
    )
}