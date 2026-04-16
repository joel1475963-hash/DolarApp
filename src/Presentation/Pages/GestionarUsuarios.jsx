import React, { useState, useEffect } from 'react';
import { consultaUsuarios } from '../../Data/consultaUsuarios';
import { EditarUsuario } from './EditarUsuario';
export const GestionarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);

  // 1. Usamos el método de la clase para cargar
  const cargarUsuarios = async () => {
    const datos = await consultaUsuarios.obtenerTodos();
    if (!datos.error) {
      setUsuarios(datos);
    } else {
      console.error(datos.error);
    }
  };

  useEffect(() => { 
    cargarUsuarios(); 
  }, []);

  // 2. Usamos el método de la clase para eliminar
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      const res = await consultaUsuarios.eliminar(id);
      if (res.success) {
        cargarUsuarios(); // Refresca la tabla tras eliminar
      } else {
        alert("Error al eliminar: " + (res.error || "No se pudo completar la acción"));
      }
    }
  };

  return (
    <section>
      <h3>Usuarios del Sistema</h3>
      <table className="tabla-empresarial">
        <thead>
          <tr>
            <th>CI</th>
            <th>Nombre</th>
            <th>Celular</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.ci}</td>
              <td>{u.nombre} {u.apellidoP}</td>
              <td>{u.celular}</td>
              <td>{u.nombreU}</td>
              <td>{u.contraseña}</td>
              <td>{u.rol}</td>
              <td>
                <button 
                  className="btn-edit" 
                  onClick={() => setUsuarioAEditar(u)}
                >
                  Editar
                </button>
                <button 
                  className="btn-cancel" 
                  onClick={() => handleEliminar(u.id)} 
                  style={{ marginLeft: '10px' }}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Renderizado condicional del modal de edición */}
      {usuarioAEditar && (
        <EditarUsuario 
          usuario={usuarioAEditar} 
          onCerrar={() => setUsuarioAEditar(null)} 
          onGuardar={cargarUsuarios} 
        />
      )}
    </section>
  );
};