export const YearsMenu = ({activeYear, years, setState}: {activeYear: number, years: number[], setState: React.Dispatch<React.SetStateAction<number>>}) => {

    return(
        <div>
            <div style={{marginLeft: 10, fontWeight: 500, fontSize: 14}}>
                Movimentações no Ano
            </div>

            <div id="year-menu">
                {years.map(year => {
                    return(
                        <button key={year} className={`year-option ${activeYear === year ? 'active' : ''}`} onClick={() => setState(year)}>{year}</button>
                    )
                })}
            </div>
        </div>
    )
}