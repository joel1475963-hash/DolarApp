import React, { useState } from 'react';
import { TipoCambio } from './TipoCambio'; 
import { VisualizarOfertas } from './VisualizarOfertas'; 
import { PublicarOferta } from './PublicarOferta';    
import { VerMisOfertas } from './VerMisOfertas';
import './estilos.css';

export const Usuario = ({ user, onLogout }) => {
  // Ahora uso 'vista' para saber qué mostrar: 'inicio', 'cambio', 'verOfertas', 'publicar'
  const [vista, setVista] = useState('inicio');

  const renderVista = () => {
    switch (vista) {
      case 'cambio':
        return (
          <>
            <div className="content-header-flex">
              <h3>Tipos de Cambio Actuales</h3>
              <button className="btn-edit" onClick={() => setVista('inicio')}>Volver</button>
            </div>
            <TipoCambio />
          </>
        );
      case 'verOfertas':
        return <VisualizarOfertas onVolver={() => setVista('inicio')} />;
      case 'publicar':
        return <PublicarOferta user={user} onVolver={() => setVista('inicio')} />;
      case 'misOfertas':
        return <VerMisOfertas user={user} onVolver={() => setVista('inicio')} />;
      default:
        return (
          <div className="welcome-container">
            <h3>Seleccione una opción</h3>
            <div className="menu-grid">
              <button className="btn-refresh main-btn" onClick={() => setVista('cambio')}>
                Consultar Tipo de Cambio
              </button>
              <button className="btn-refresh main-btn" onClick={() => setVista('verOfertas')}>
                Visualizar Ofertas de Compra/Venta
              </button>
              <button className="btn-refresh main-btn btn-accent" onClick={() => setVista('publicar')}>
                + Publicar mi Oferta
              </button>
              <button className="btn-refresh main-btn" onClick={() => setVista('misOfertas')}>
                Gestionar Mis Ofertas
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-page">
      <header className="navbar">
        <div className="admin-info">
          <h1>DolarApp - Cliente</h1>
          <span>Bienvenido, <strong>{user.nombreU}</strong></span>
        </div>
        <button className="btn-logout" onClick={onLogout}>Cerrar Sesión</button>
      </header>

      <main className="content-area">
        <div className="admin-content">
          {renderVista()}
        </div>
      </main>
    </div>
  );
};