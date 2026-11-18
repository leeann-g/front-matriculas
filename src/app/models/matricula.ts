export interface Matricula {
    id:number;
    date: string;
    name:string;
    code: string;
    nuid:number;
    meter_number: string;
    address: string;
    rip_status: string;
    status: string;
    observation:string
}

export interface crearMatricula{
    date: string,
    name:string,
    code:string,
    nuid: number,
    meter_number:string,
    address: string,
    rip_status: string,
    status: string,
    observation: string
}
export interface respuestaAct{
    mensaje: string
}

export interface agrupacionMatriculas{
    anio: number
    month: number,
    month_name: string,
    total: number
}