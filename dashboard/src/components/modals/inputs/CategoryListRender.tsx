import { useState, useEffect } from "react"
import type { InputProps, CategoryType} from "../../../types/InterfaceProps"
import { Select, Option } from "@mui/joy"


export const CategoryListRender = ({value, setState, fetchURL}: InputProps & {fetchURL: string}) => {

    const [categoryList, setCategoryList] = useState<CategoryType[]>()

    useEffect(() => {
        fetch(fetchURL)
        .then(response => response.json())
        .then((data: CategoryType[]) => {
            setCategoryList(data)
        })
    }, [])

    if (!categoryList) return 'carregando'

    return(
        <div>
            <Select listboxId="listbox-modal-profit" id={'profit-category'} placeholder="Categoria" value={value} onChange={(_e, value) => setState(value)} size="sm">
                {categoryList?.map((obj: CategoryType) => {
                    return(
                        <Option value={obj.tag}>{obj.name}</Option>
                    )
                })}
            </Select>
        </div>
    )
}