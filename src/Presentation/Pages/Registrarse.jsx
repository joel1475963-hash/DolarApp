import React, { useState } from 'react';
import { consultaUsuarios } from '../../Data/consultaUsuarios';

import {ValidacionRegistroUsuarios} from '../../Core/Rules/ValidacionRegistroUsuario';
export const Registrarse = ({ onVolver }) => {
  const [datos, setDatos] = useState({
    ci: '', 
    nombre: '', 
    apellidoP: '', 
    apellidoM: '', 
    celular: '', 
    nombreU: '', 
    contrasena: ''
  });

  const [cargando, setCargando] = useState(false);
  const [errorCi, setErrorCi] = useState(false);

  // --- MANEJADORES USANDO LA CLASE DE VALIDACIÓN ---

  const handleCiChange = async (e) => {
    const valor = e.target.value;
    
    if (ValidacionRegistroUsuarios.validarFormatoCI(valor)) {
      setDatos({ ...datos, ci: valor });

      
      if (valor.length === 7) {
        const existe = await ValidacionRegistroUsuarios.verificarCiExistente(valor);
        setErrorCi(existe);
      } else {
        setErrorCi(false);
      }
    }
  };

  const handleLetrasChange = (e, campo) => {
    const valor = e.target.value;
    
    if (ValidacionRegistroUsuarios.validarSoloLetras(valor)) {
      setDatos({ ...datos, [campo]: valor });
    }
  };

  const handleCelularChange = (e) => {
    const valor = e.target.value;
    // Validar formato celular (8 dígitos)
    if (ValidacionRegistroUsuarios.validarFormatoCelular(valor)) {
      setDatos({ ...datos, celular: valor });
    }
  };

  const handleRegistro = async (e) => {
    e.preventDefault();
    
    if (errorCi) {
      alert("No se puede registrar: El C.I. ya existe.");
      return;
    }

    setCargando(true);
    const res = await consultaUsuarios.registrar(datos);
    setCargando(false);

    if (res.success) {
      alert("Registro exitoso.");
      onVolver();
    } else {
      alert("Error: " + (res.error || "No se pudo completar el registro"));
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={handleRegistro} className="login-card">
        <h1>Crear Cuenta</h1>
        
        <div className="form-grid">
          <input 
            type="text" 
            placeholder="C.I." 
            value={datos.ci}
            onChange={handleCiChange}
            className={errorCi ? 'input-error' : ''} 
            required 
          />
          {errorCi && <span style={{color: 'red', fontSize: '12px'}}>C.I. ya registrado</span>}

          <input 
            type="text" 
            placeholder="Nombre" 
            value={datos.nombre}
            onChange={(e) => handleLetrasChange(e, 'nombre')} 
            required 
          />
          <input 
            type="text" 
            placeholder="Apellido Paterno" 
            value={datos.apellidoP}
            onChange={(e) => handleLetrasChange(e, 'apellidoP')} 
            required 
          />
          <input 
            type="text" 
            placeholder="Apellido Materno" 
            value={datos.apellidoM}
            onChange={(e) => handleLetrasChange(e, 'apellidoM')} 
          />
          <input 
            type="text" 
            placeholder="Celular"
            value={datos.celular}
            onChange={handleCelularChange} 
            required 
          />
        </div>

        <hr />
        
        <input 
          type="text" 
          placeholder="Nombre de Usuario" 
          value={datos.nombreU}
          onChange={e => setDatos({...datos, nombreU: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={datos.contrasena}
          onChange={e => setDatos({...datos, contrasena: e.target.value})} 
          required 
        />
        
        <button type="submit" disabled={cargando || errorCi}>
          {cargando ? 'Procesando...' : 'Registrarme'}
        </button>
        
        <button type="button" onClick={onVolver} disabled={cargando}>
          Ya tengo cuenta
        </button>
      </form>
    </div>
  );
};