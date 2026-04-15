import React, { useState, useEffect } from 'react';
import { 
  obtenerTiposCambio, 
  actualizarTipoCambio, 
  crearTipoCambio, 
  eliminarTipoCambio 
} from '../../Data/consultarCambio';

export const VisualizarTipoCambio = () => {
  const [listaCambios, setListaCambios] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [modalAbierto, setModalAbierto] = useState(false);
  
  // Estado para saber si estamos editando uno existente o creando uno nuevo
  const [esNuevo, setEsNuevo] = useState(false);
  const [seleccionado, setSeleccionado] = useState({ id: '', nombre: '', valor: '', fuente: '' });

  const cargarDatosCambio = async () => {
    setCargando(true);
    const datos = await obtenerTiposCambio();
    if (datos && !datos.error) setListaCambios(datos);
    setCargando(false);
  };

  useEffect(() => { cargarDatosCambio(); }, []);

  // Abrir para editar
  const abrirEditar = (item) => {
    setEsNuevo(false);
    setSeleccionado(item);
    setModalAbierto(true);
  };

  // Abrir para crear nuevo
  const abrirNuevo = () => {
    setEsNuevo(true);
    setSeleccionado({ id: '', nombre: '', valor: '', fuente: '' });
    setModalAbierto(true);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este tipo de cambio?")) {
      const res = await eliminarTipoCambio(id);
      if (res.success) cargarDatosCambio();
    }
  };

  const guardarCambios = async (e) => {
    e.preventDefault();
    const res = esNuevo 
      ? await crearTipoCambio(seleccionado) 
      : await actualizarTipoCambio(seleccionado);

    if (res.success) {
      setModalAbierto(false);
      cargarDatosCambio();
    } else {
      alert("Error: " + res.error);
    }
  };

  return (
    <section className="admin-content">
      <div className="content-header">
        <h3>Gestión de Tipo de Cambio</h3>
        <div>
          <button className="btn-edit" onClick={abrirNuevo} style={{marginRight: '10px'}}>
            + Añadir Nuevo
          </button>
          <button className="btn-refresh" onClick={cargarDatosCambio}>
            {cargando ? '...' : 'Actualizar'}
          </button>
        </div>
      </div>
      
      <table className="tabla-empresarial">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Fuente</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {listaCambios.map((item) => (
            <tr key={item.id}>
              <td>{item.nombre}</td>
              <td className="valor-destacado">{item.valor}</td>
              <td>{item.fuente}</td>
              <td>
                <button className="btn-edit" onClick={() => abrirEditar(item)}>Editar</button>
                <button 
                  className="btn-cancel" 
                  onClick={() => handleEliminar(item.id)}
                  style={{marginLeft: '10px'}}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAbierto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{esNuevo ? 'Añadir Nuevo Tipo' : `Editar ${seleccionado.nombre}`}</h3>
            <form onSubmit={guardarCambios}>
              <div className="form-group">
                <label>Nombre (Ej: Dólar Paralelo):</label>
                <input 
                  type="text" 
                  value={seleccionado.nombre} 
                  onChange={(e) => setSeleccionado({...seleccionado, nombre: e.target.value})}
                  required 
                  disabled={!esNuevo} // No permitimos cambiar el nombre si ya existe
                />
              </div>
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
                <label>Fuente:</label>
                <input 
                  type="text" 
                  value={seleccionado.fuente} 
                  onChange={(e) => setSeleccionado({...seleccionado, fuente: e.target.value})}
                  required 
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-save">
                  {esNuevo ? 'Crear' : 'Guardar'}
                </button>
                <button type="button" className="btn-cancel" onClick={() => setModalAbierto(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};