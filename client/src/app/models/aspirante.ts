export class Aspirante {
  constructor(
    public _id: string,
    public user: string,
    public name: String,
    public surname: String,
    public surname2: String,
    public email: String,
    public fuenteReclutamiento: String,
    public cedula: String,
    public cargo: String,
    public campana: String,
    public experiencia: String,
    public telefono: String,
    public citado: String,
    public observaciones: String,
    public fechaEntrevista: Date,
    public psicologa: String,
    public numeroLlamada: String,
    public interaccion: String
  ) {}
}
