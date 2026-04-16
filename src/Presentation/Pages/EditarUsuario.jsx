import React, { useState } from 'react';
import { consultaUsuarios } from '../../Data/consultaUsuarios';

export const EditarUsuario = ({ usuario, onCerrar, onGuardar }) => {

  const [form, setForm] = useState({ ...usuario });

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const res = await consultaUsuarios.actualizar(form);
    
    if (res.success) {
      alert("Usuario actualizado correctamente");
      onGuardar(); 
      onCerrar(); 
    } else {
      alert("Error: " + (res.error || "No se pudo actualizar"));
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Editar Datos de Usuario</h3>
        <form onSubmit={handleSubmit} className="oferta-form">
          <label>Nombre Completo:</label>
          <input 
            type="text" 
            value={form.nombre} 
            onChange={e => setForm({...form, nombre: e.target.value})} 
          />
          
          <label>Celular:</label>
          <input 
            type="text" 
            value={form.celular} 
            onChange={e => setForm({...form, celular: e.target.value})} 
          />
          
          <label>Rol:</label>
          <select 
            value={form.rol} 
            onChange={e => setForm({...form, rol: e.target.value})}
          >
            <option value="Usuario">Usuario</option>
            <option value="Administrador">Administrador</option>
          </select>

          <div className="modal-actions">
            <button type="submit" className="btn-save">Guardar</button>
            <button type="button" className="btn-cancel" onClick={onCerrar}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};