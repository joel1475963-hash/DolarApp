import { consultaUsuarios } from '../../Data/consultaUsuarios';

export class ValidacionRegistroUsuarios {
  
  // Validar formato de C.I. (Solo números, ej: máx 10 dígitos)
  static validarFormatoCI(valor) {
    return /^\d*$/.test(valor) && valor.length <= 7;
  }

  // Validar que solo entren letras (para nombres y apellidos)
  static validarSoloLetras(valor) {
    return /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(valor) && valor.length <=15;
  }

  // Validar formato de Celular (8 dígitos)
  static validarFormatoCelular(valor) {
    return /^\d*$/.test(valor) && valor.length <= 8;
  }

  // VALIDACIÓN ASÍNCRONA: Consultar a la base de datos si el CI existe
  static async verificarCiExistente(ci) {
    if (ci.length < 5) return false; // No buscar hasta que tenga un largo mínimo
    
    try {
      // Suponiendo que en tu clase consultaUsuarios tienes un método para buscar por CI
      const existe = await consultaUsuarios.verificarDuplicado('ci', ci);
      return existe; // true si ya existe, false si está libre
    } catch (error) {
      console.error("Error al validar CI:", error);
      return false;
    }
  }
}