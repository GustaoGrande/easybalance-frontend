import { BarChartBox, BillFill } from "../eb-icons/SvgCollection";
import type { ExpandedMenuProps } from "./MenuInterface";

export default function Sidepanel({expanded}: ExpandedMenuProps){

    return(
        <aside className={`sidebar__container ${expanded ? 'expanded' : ''}`}>
            <header>
                <h1>EasyBalance</h1>
            </header>

            <nav>
                <ul className="sidebar__itens">
                    <li data-page-tag="dashboard">
                        <a href="/">
                            <div className="itens-ico">
                                <BarChartBox />
                            </div>
                            <div className="itens-title">
                                Dashboard
                            </div>
                        </a>
                    </li>
                    <li data-page-tag="charge">
                        <a href="#">
                            <div className="itens-ico">
                                <BillFill/>
                            </div>
                            <div className="itens-title">
                                Cobranças
                            </div>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}