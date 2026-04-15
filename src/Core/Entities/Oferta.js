// src/Core/Entities/Oferta.js
export class Oferta {
  constructor(id, usuarioId, monto, tipoCambioPropuesto, tipo, ubicacion) {
    this.id = id;
    this.usuarioId = usuarioId; 
    this.monto = monto;         
    this.tipoCambioPropuesto = tipoCambioPropuesto; 
    this.tipo = tipo;           
    this.ubicacion = ubicacion; 
    this.fechaPublicacion = new Date();
    this.estado = 'ACTIVA';    
  }


  get totalBolivianos() {
    return (this.monto * this.tipoCambioPropuesto).toFixed(2);
  }


  esOfertaValida() {
    return (
      this.monto > 0 && 
      this.tipoCambioPropuesto > 0 && 
      (this.tipo === 'COMPRA' || this.tipo === 'VENTA')
    );
  }
}