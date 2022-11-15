export class Vacaciones{
 
    constructor(
        public _id: string,
        public user: string,
        public fechaSolicitud: string,
        public fechaInicio: string,
        public fechaFin: string,
        public AprovacionJefe: string,
        public AprovacionRrHh: string
    ){

    }
}