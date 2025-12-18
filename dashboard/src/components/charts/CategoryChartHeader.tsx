export const CategoryChartHeader = ({option, setState}: {option: 'income' | 'expense', setState: React.Dispatch<React.SetStateAction<'income' | 'expense'>>}) => {

    return(
        <header>
            <h2>Categorias mais usadas</h2>
            <div>
                <button className={`category-option ${option === 'income' ? 'active' : ''}`} onClick={() => setState('income')}>Entradas</button>
                <button className={`category-option ${option === 'expense' ? 'active' : ''}`} onClick={() => setState('expense')}>Saidas</button>
            </div>
        </header>
    )
}