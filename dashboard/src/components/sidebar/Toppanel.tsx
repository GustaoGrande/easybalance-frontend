import { LogoutCircleLine, MenuLine, NotificationLine } from "../eb-icons/SvgCollection";
import type { ExpandedMenuProps } from "./MenuInterface";

export default function Toppanel({setExpanded, expanded}: ExpandedMenuProps){
    return(
        <header  className="toppanel__container">

            <div className="mobile__btn" onClick={() => setExpanded!(!expanded)}> <MenuLine/> </div>

            <div className="toppanel-itens-left__container">
                <div><NotificationLine height={24} width={24}/></div>
                <div onClick={() => {window.location.href = '/auth/logout'}}><LogoutCircleLine height={24} width={24}/></div>
            </div>

        </header>
    )
}