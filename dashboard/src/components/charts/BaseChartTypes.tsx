export type Transaction = {
    date: string,
    description: string,
    type: 'income' | 'expense',
    value: string
}

export type YearBalance = {
    month: string,
    year: number,
    transaction: Transaction[]
}

export type CategoryCount = {
    category__tag: string,
    category__name: string,
    total_count: number
}

export type MostCategorys = {
    income: CategoryCount[],
    expense: CategoryCount[],
}

