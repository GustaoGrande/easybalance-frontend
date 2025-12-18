import { useState } from "react"
import Toppanel from "./Toppanel"
import Sidepanel from "./Sidepanel"
import type {SidepanelProps} from "./MenuInterface"

import "./styles/sidebar-style.css"

export default function Sidebar({children}: SidepanelProps){

    const [expanded, setExpanded] = useState<boolean>(false)

    return(
        <>  
            <Toppanel expanded={expanded} setExpanded={setExpanded}/>

            <div className="mobile-sidebar-bg__container" onClick={() => setExpanded(false)} style={{display: expanded ? 'block' : 'none'}}></div>

            <Sidepanel expanded={expanded}/>

            {children}
        </>
    )
}
