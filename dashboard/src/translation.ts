type PaymentStatus = 'PENDING' | 'OVERDUE' | 'CONFIRMED' | 'CANCELLED'
type MonthNames = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export const paymentStatusPT: Record<PaymentStatus, string> = {
    PENDING: 'Pendente',
    CANCELLED: 'Cancelado',
    CONFIRMED: 'Completado',
    OVERDUE: 'Vencido'
}

export const monthNamesPT: Record<MonthNames, string> = {
    1: 'Janeiro',
    4: 'Abril',
    8: 'Agosto',
    12: 'Dezembro',
    2: 'Fevereiro',
    7: 'Julho',
    6: 'June',
    3: 'Março',
    5: 'Maio',
    11: 'Novembro',
    10: 'Outubro',
    9: 'Setembro',
}

