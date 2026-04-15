import React, { useState, useEffect } from 'react';
import { obtenerMisOfertas, eliminarOferta, actualizarOferta } from '../../Data/consultarOfertas';

export const VerMisOfertas = ({ user, onVolver }) => {
  const [misOfertas, setMisOfertas] = useState([]);
  const [editando, setEditando] = useState(null); // Estado para la oferta que se está editando

  const cargar = async () => {
    // Usamos el ID del usuario logueado para filtrar sus publicaciones
    const datos = await obtenerMisOfertas(user.id);
    if (!datos.error) setMisOfertas(datos);
  };

  useEffect(() => { cargar(); }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta oferta?")) {
      const res = await eliminarOferta(id);
      if (res.success) {
        alert("Oferta eliminada");
        cargar();
      }
    }
  };

  const handleGuardarEdicion = async (e) => {
    e.preventDefault();
    const res = await actualizarOferta(editando);
    if (res.success) {
      alert("Oferta actualizada con éxito");
      setEditando(null);
      cargar();
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <section>
      <div className="content-header-flex">
        <h3>Mis Publicaciones</h3>
        <button className="btn-edit" onClick={onVolver}>Volver</button>
      </div>

      <table className="tabla-empresarial">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {misOfertas.map((o) => (
            <tr key={o.id}>
              <td style={{ fontWeight: 'bold' }}>{o.tipo}</td>
              <td>{o.monto} USD</td>
              <td>{o.precio_propuesto} BS</td>
              <td><span className={`badge ${o.estado.toLowerCase()}`}>{o.estado}</span></td>
              <td>
                <button className="btn-edit" onClick={() => setEditando(o)}>Editar</button>
                <button className="btn-cancel" style={{marginLeft: '10px'}} onClick={() => handleEliminar(o.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* --- MINI PANTALLA (MODAL) DE EDICIÓN --- */}
      {editando && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar Oferta</h3>
            <form onSubmit={handleGuardarEdicion} className="oferta-form">
              <label>Monto (USD):</label>
              <input 
                type="number" 
                value={editando.monto}
                onChange={(e) => setEditando({...editando, monto: e.target.value})}
                required
              />

              <label>Precio Propuesto (BS):</label>
              <input 
                type="number" 
                step="0.01"
                value={editando.precio_propuesto}
                onChange={(e) => setEditando({...editando, precio_propuesto: e.target.value})}
                required
              />

              <label>Estado:</label>
              <select 
                value={editando.estado}
                onChange={(e) => setEditando({...editando, estado: e.target.value})}
              >
                <option value="ACTIVA">ACTIVA</option>
                <option value="COMPLETADA">COMPLETADA</option>
                <option value="CANCELADA">CANCELADA</option>
              </select>

              <div className="modal-actions" style={{marginTop: '20px'}}>
                <button type="submit" className="btn-save">Guardar Cambios</button>
                <button type="button" className="btn-cancel" onClick={() => setEditando(null)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};