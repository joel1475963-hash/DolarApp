import React, { useState } from 'react';
// Importamos la instancia de la clase desde tu archivo de datos
import { consultaUsuarios } from '../../Data/consultaUsuarios';

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

  const handleRegistro = async (e) => {
    e.preventDefault();
    setCargando(true);

    // Usamos el método de la clase
    const res = await consultaUsuarios.registrar(datos);
    
    setCargando(false);

    if (res.success) {
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      onVolver(); // Regresa a la pantalla de Login
    } else {
      // Si el PHP devuelve un error (ej: usuario duplicado), lo mostramos
      alert("Error: " + (res.error || "No se pudo completar el registro"));
    }
  };

  //para validar datos de cel
  const handleCelularChange = (e) => {
  const valor = e.target.value;

  // Validación: Solo números (\d*) y máximo 8 caracteres
  if (/^\d*$/.test(valor) && valor.length <= 8) {
    setDatos({
      ...datos,
      celular: valor
    });
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
            onChange={e => setDatos({...datos, ci: e.target.value})} 
            required 
          />
          <input 
            type="text" 
            placeholder="Nombre" 
            onChange={e => setDatos({...datos, nombre: e.target.value})} 
            required 
          />
          <input 
            type="text" 
            placeholder="Apellido Paterno" 
            onChange={e => setDatos({...datos, apellidoP: e.target.value})} 
            required 
          />
          <input 
            type="text" 
            placeholder="Apellido Materno" 
            onChange={e => setDatos({...datos, apellidoM: e.target.value})} 
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
          onChange={e => setDatos({...datos, nombreU: e.target.value})} 
          required 
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          onChange={e => setDatos({...datos, contrasena: e.target.value})} 
          required 
        />
        
        <button type="submit" disabled={cargando}>
          {cargando ? 'Procesando...' : 'Registrarme'}
        </button>
        
        <button 
          type="button" 
          className="btn-secundario" 
          onClick={onVolver}
          disabled={cargando}
        >
          Ya tengo cuenta
        </button>
      </form>
    </div>
  );
};