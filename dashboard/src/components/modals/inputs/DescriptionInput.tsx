import { Textarea, Typography } from "@mui/joy";
import type { InputProps } from "../../../types/InterfaceProps";

export default function DescriptionInput({value, setState}: InputProps){
    return(
        <div className="input__container">
            <label htmlFor="profit-description">Descrição</label>
            <Textarea
                id="profit-description"
                size="sm"
                sx={{fontSize: '12px'}}
                slotProps={{textarea: {maxLength: 100}}}
                endDecorator={<Typography level="body-xs" sx={{ml: 'auto'}}>
                    {value.length}
                </Typography>}
                onChange={(e) => setState(e.target.value)}
                value={value}/>
        </div>
    )
}