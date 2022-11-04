export class OfertaLaboral{
 
    constructor(
        public _id: string,
        public user: string,
        public titulo: string,
        public description: string,
        public cargo: string,
        public aprobacion: string,
        public fechaIngreso:string,
        public fechaSolicitud:string,
        public activo:string,
        public image: string
    ){

    }
}