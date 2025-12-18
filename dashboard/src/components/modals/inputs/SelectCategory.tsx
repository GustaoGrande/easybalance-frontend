import type { InputProps } from "../../../types/InterfaceProps"
import { CategoryListRender } from "./CategoryListRender"

export default function SelectCategory({value, setState, fetchURL}: InputProps & {fetchURL: string}){

    return(
        <div className="input__container">
            <label htmlFor="profit-category">Categoria</label>
            <CategoryListRender value={value} setState={setState} fetchURL={fetchURL}/>
        </div>
    )
}
