export class Postulacion{
    constructor(
        public _id: string,
        public ofertaLaboral:    String,
        public fechaPostulacion: String,
        public politica:         String,
        public user: string
    ){
    }
}