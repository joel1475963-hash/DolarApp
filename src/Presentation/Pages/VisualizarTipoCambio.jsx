import React, { useState, useEffect } from 'react';
import { obtenerTiposCambio, actualizarTipoCambio } from '../../Data/consultarCambio';

export const VisualizarTipoCambio = () => {
  const [listaCambios, setListaCambios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [seleccionado, setSeleccionado] = useState({ id: '', nombre: '', valor: '', fuente: '' });

  const cargarDatosCambio = async () => {
    setCargando(true);
    try {
      const datos = await obtenerTiposCambio();
      if (datos && !datos.error) setListaCambios(datos);
    } catch (error) {
      console.error("Error al cargar cambios:", error);
    }
    setCargando(false);
  };

  useEffect(() => {
    cargarDatosCambio();
  }, []);

  const abrirModal = (item) => {
    setSeleccionado(item);
    setModalAbierto(true);
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    const res = await actualizarTipoCambio(seleccionado);
    if (res.success) {
      setModalAbierto(false);
      cargarDatosCambio();
    } else {
      alert("Error al guardar: " + (res.error || "Intente de nuevo"));
    }
  };

  return (
    <section className="admin-content">
      <div className="content-header">
        <h3>Gestión de Tipo de Cambio</h3>
        <button className="btn-refresh" onClick={cargarDatosCambio} disabled={cargando}>
          {cargando ? 'Actualizando...' : 'Actualizar'}
        </button>
      </div>
      
      <table className="tabla-empresarial">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Fuente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaCambios.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td className="valor-destacado">{item.valor}</td>
              <td>{item.fuente}</td>
              <td>
                <button className="btn-edit" onClick={() => abrirModal(item)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Editar {seleccionado.nombre}</h3>
            <form onSubmit={guardarCambios}>
              <div className="form-group">
                <label>Precio actual:</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={seleccionado.valor} 
                  onChange={(e) => setSeleccionado({...seleccionado, valor: e.target.value})}
                  required 
                />
              </div>
              <div className="form-group">
                <label>Fuente de información:</label>
                <input 
                  type="text" 
                  value={seleccionado.fuente} 
                  onChange={(e) => setSeleccionado({...seleccionado, fuente: e.target.value})}
                  required 
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save">Guardar Cambios</button>
                <button type="button" className="btn-cancel" onClick={() => setModalAbierto(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};