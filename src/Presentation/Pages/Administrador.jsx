//Aqui esta el Frontend la parte visual de Administrador
import React, { useState } from 'react';
import { VisualizarTipoCambio } from './VisualizarTipoCambio';
import './estilos.css';

export const Administrador = ({ user, onLogout }) => {
  const [vista, setVista] = useState('inicio');

  const renderContenido = () => {
    switch (vista) {
      case 'usuarios':
        return (
          <section className="admin-content">
            <h3>Lista de Usuarios Registrados</h3>
            <p>Cargando tabla de usuarios desde MySQL...</p>
          </section>
        );
      case 'cambio':
        return <VisualizarTipoCambio />;
      default:
        return (
          <section className="admin-stats">
            <div className="card">Usuarios Activos: 10</div>
            <div className="card">Ofertas Hoy: 5</div>
          </section>
        );
    }
  };

  return (
    <div className="admin-page">
      <header className="navbar">
        <div className="admin-info">
          <h1>Panel de Administrador</h1>
          <span>Bienvenido <strong>{user.nombreU}</strong></span>
        </div>
        <button className="btn-logout" onClick={onLogout}>Cerrar Sesión</button>
      </header>

      <div className="admin-layout">
        <aside className="sidebar">
          <button className={vista === 'inicio' ? 'active' : ''} onClick={() => setVista('inicio')}>Inicio</button>
          <button className={vista === 'usuarios' ? 'active' : ''} onClick={() => setVista('usuarios')}>Ver Usuarios</button>
          <button className={vista === 'cambio' ? 'active' : ''} onClick={() => setVista('cambio')}>Consultar Cambio</button>
        </aside>

        <main className="content-area">
          <div className="admin-content">
            {renderContenido()}
          </div>
        </main>
      </div>
    </div>
  );
};