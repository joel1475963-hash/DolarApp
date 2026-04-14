// src/core/entities/ExchangeRate.js
export class ExchangeRate {
  constructor(official, parallel, dealer) {
    this.official = official; // Dólar referencial
    this.parallel = parallel; // Dólar paralelo
    this.dealer = dealer;     // Dólar librecambista
    this.lastUpdated = new Date().toLocaleTimeString();
  }
}