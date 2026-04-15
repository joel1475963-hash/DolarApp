import React, { useState, useEffect } from 'react';
import { obtenerTodosLosUsuarios, eliminarUsuario } from '../../Data/consultaUsuarios';
import { EditarUsuario } from './EditarUsuario';

export const GestionarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioAEditar, setUsuarioAEditar] = useState(null);

  const cargarUsuarios = async () => {
    const datos = await obtenerTodosLosUsuarios();
    if (!datos.error) setUsuarios(datos);
  };

  useEffect(() => { cargarUsuarios(); }, []);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      const res = await eliminarUsuario(id);
      if (res.success) cargarUsuarios();
    }
  };

  return (
    <section className="admin-content">
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
              <td>{u.nombre}</td>
              <td>{u.celular}</td>
              <td>{u.nombreU}</td>
              <td>{u.contraseña}</td>
              <td>{u.rol}</td>
              <td>
                <button className="btn-edit" onClick={() => setUsuarioAEditar(u)}>Editar</button>
                <button className="btn-cancel" onClick={() => handleEliminar(u.id)} style={{marginLeft: '10px'}}>Borrar</button>
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