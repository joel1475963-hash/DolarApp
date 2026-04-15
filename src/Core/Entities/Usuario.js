// src/Core/Entities/Usuario.js
//Clase usuario hereda de persona
export class Usuario extends Persona {
  constructor(ci, nombre, apellidoP, apellidoM, id,nombreU,Contraseña, rol) {
    super(ci, nombre, apellidoP, apellidoM);
    this.id = id;
    this.nombreU = nombreU;
    this.Contraseña = Contraseña;
    this.rol = rol;
  }
}