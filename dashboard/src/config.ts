export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const TRANSACTION_URI = import.meta.env.VITE_TRANSACTION_URI

export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: "currency",
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
})

export function keyObjectRetriever(key: string, obj: any, return_default: any = null){
    try{
        return obj[key]
    } catch{
        return return_default
    }
}