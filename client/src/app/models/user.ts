export class User{
    getIdentity() {
      throw new Error('Method not implemented.');
    }
 
    constructor(
        public _id: string,
        public name: string,
        public surname: string,
        public surname2: String,
        public cargo: String,
        public fechaIngreso: String,
        public fechaRetiro: String,
        public salario: String,
        public tipoDocumento: String,
        public cedula: String,
        public nick: string,
        public email: string,
        public password: string,
        public role: string,
        public image: string
    ){

    }
}