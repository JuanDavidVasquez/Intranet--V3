export class Salud{
    constructor(
        public _id: string,
        public user: String,
        public estado:        String,
        public accidentes:    String,
        public tipoAccidente: String,
        public observacion:   String  
    ){
    }
}