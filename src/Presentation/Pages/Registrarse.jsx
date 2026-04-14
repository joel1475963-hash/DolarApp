import React, { useState } from 'react';
import { registrarNuevoUsuario } from '../../Data/consultaUsuarios';

export const Registrarse = ({ onVolver }) => {
  const [datos, setDatos] = useState({
    ci: '', nombre: '', apellidoP: '', apellidoM: '', celular: '', nombreU: '', contrasena: ''
  });

  const handleRegistro = async (e) => {
    e.preventDefault();
    const res = await registrarNuevoUsuario(datos);
    if (res.success) {
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      onVolver();
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <div className="login-screen">
      <form onSubmit={handleRegistro} className="login-card">
        <h1>Crear Cuenta</h1>
        <input type="text" placeholder="C.I." onChange={e => setDatos({...datos, ci: e.target.value})} required />
        <input type="text" placeholder="Nombre" onChange={e => setDatos({...datos, nombre: e.target.value})} required />
        <input type="text" placeholder="Apellido Paterno" onChange={e => setDatos({...datos, apellidoP: e.target.value})} required />
        <input type="text" placeholder="Apellido Materno" onChange={e => setDatos({...datos, apellidoM: e.target.value})} />
        <input type="text" placeholder="Celular" onChange={e => setDatos({...datos, celular: e.target.value})} required />
        <hr />
        <input type="text" placeholder="Nombre de Usuario" onChange={e => setDatos({...datos, nombreU: e.target.value})} required />
        <input type="password" placeholder="Contraseña" onChange={e => setDatos({...datos, contrasena: e.target.value})} required />
        
        <button type="submit">Registrarme</button>
        <button type="button" className="btn-secundario" onClick={onVolver}>Ya tengo cuenta</button>
      </form>
    </div>
  );
};