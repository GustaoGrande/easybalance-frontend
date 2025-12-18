export interface modalProps{
    activated: boolean
    setActivated: React.Dispatch<React.SetStateAction<boolean>>
    setNotify?: React.Dispatch<React.SetStateAction<boolean>>
}

export interface fixedExpenseDetailProps{
    monthlyFixedExpense: MonthlyFixedExpenseType | undefined
    setState: React.Dispatch<React.SetStateAction<FixedExpenseInterface | undefined>>
    fixedExpenseData: FixedExpenseInterface
}

export interface profitProps{
    profitType: 'income' | 'expense'
}

export interface InputProps{
    value?: any
    setState: React.Dispatch<React.SetStateAction<any>>
}

export type CategoryType = {
    name: string,
    tag: string,
}

export type FixedExpense = {
    id: number
    name: string
    value: string
    description: string
    due_day: number
    category: CategoryType
}

export type MonthlyFixedExpenseType = {
    id: number
    status: 'PENDING' | 'CONFIRMED' | 'OVERDUE'
    date: string
    due_date?: string
    fixed_expense: FixedExpense
}

export interface FixedExpenseInterface{
    year: number
    month: string
    monthly_expenses: MonthlyFixedExpenseType[] 
}

export type OffsetFixedExpense = {
    has_more: boolean,
    results: FixedExpenseInterface[]
}