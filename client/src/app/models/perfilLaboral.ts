export class PerfilLaboral{
 
    constructor(
        public _id: string,
        public user: String,
        public fechaIngreso: String,
        public fechaRetiro: String,
        public cargo: String,
        public jefe: String,
        public contactoJefe: String,
        public salario: String,
        public motivoRetiro: String,
        public certificadoLaboral: String,
        public empresa: String,
        public personalACargo: String,
    ){
    }
}