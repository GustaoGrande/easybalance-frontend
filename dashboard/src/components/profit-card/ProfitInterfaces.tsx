export interface ProfitMiscProps{
    actual_data: number
    previous_data: number
    misc_type: 'income' | 'expense'
}

export type incomeExpenseType = {
    this_month: number,
    last_month: number,
}
