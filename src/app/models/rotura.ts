import { Matricula } from "./matricula"
export interface Rotura {
    id: number,
    tuition_id: number,
    rip: string,
    payment: string,
    amount: number,
    payment_date: string,
    observation: string,
    tuition: Matricula
}

export interface crearRotura{
    tuition_id: number,
    rip: string,
    payment:string,
    amount: number,
    payment_date: string,
    observation: string
}
