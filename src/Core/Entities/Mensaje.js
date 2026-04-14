export class Mensaje {
  constructor(id, emisorId, receptorId, contenido, ofertaId) {
    this.id = id;
    this.emisorId = emisorId;   // Usuario que contacta
    this.receptorId = receptorId; // Dueño de la oferta
    this.ofertaId = ofertaId;     // Sobre qué dólar están negociando
    this.contenido = contenido;
    this.fecha = new Date();
    this.leido = false;
  }
}