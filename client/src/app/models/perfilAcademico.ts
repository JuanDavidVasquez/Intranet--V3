export class PerfilAcademico{
    constructor(
        public _id: string,
        public user: String,
        public lvlAcademico: String,
        public titulo: String,
        public estado:String,
        public instituto:String,
        public fechaIngreso:String,
        public fechaCulminacion:String,
        public certificadoAcademico:String
    ){
    }
}