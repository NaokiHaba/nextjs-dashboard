export type Invoice = {
    id: string
    customer_id: string
    amount: number
    status: 'paid' | 'pending'
    data: string
}