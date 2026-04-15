// src/Core/Entities/TipoCambio.js
export class TipoCambio {
  constructor(nombre, valor, fuente) {
    this.nombre = nombre; 
    this.valor = valor;   
    this.fuente = fuente; 
    this.fechaActualizacion = new Date();
  }


  get precioFormateado() {
    return `${this.valor.toFixed(2)} Bs.`;
  }

 
  esValido() {
    return this.valor > 0 && typeof this.valor === 'number';
  }

  convertir(montoDolares) {
    return montoDolares * this.valor;
  }
}