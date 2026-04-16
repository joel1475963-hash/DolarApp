//Esta es la vista de administracion
import React, { useState } from 'react';
import { VisualizarTipoCambio } from './VisualizarTipoCambio';
import { GestionarUsuarios } from './GestionarUsuarios';
import { InicioAdministracion } from './InicioAdministracion';

import { VisualizarOfertas } from './VisualizarOfertas'; 
import { PublicarOferta } from './PublicarOferta';
import { VerMisOfertas } from './VerMisOfertas';

import './estilos.css';

export const Administrador = ({ user, onLogout }) => {
  const [vista, setVista] = useState('inicio');

  const renderContenido = () => {
    switch (vista) {
      case 'inicio':
        return (
          <InicioAdministracion 
            alVerOfertas={() => setVista('verOfertas')} 
            alPublicar={() => setVista('publicar')} 
            alVerMisOfertas={() => setVista('misOfertas')}
          />
        );
      case 'usuarios':
        return <GestionarUsuarios />;
      case 'cambio':
        return <VisualizarTipoCambio />;
      
      case 'verOfertas':
        return <VisualizarOfertas onVolver={() => setVista('inicio')} />;
      case 'publicar':
        return <PublicarOferta user={user} onVolver={() => setVista('inicio')} />;
      case 'misOfertas':
        return <VerMisOfertas user={user} onVolver={() => setVista('inicio')} />;

      default:
        return null; // O una vista por defecto
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
          <button className={vista === 'cambio' ? 'active' : ''} onClick={() => setVista('cambio')}>Gestionar Cambio</button>
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