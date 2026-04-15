import React from 'react';

// Recibimos las funciones que cambiarán la "vista" en el componente Administrador
export const InicioAdministracion = ({ alVerOfertas, alPublicar, alVerMisOfertas }) => {
  return (
    <section className="inicio-admin">
      <div className="admin-actions-center" style={{ marginTop: '40px', textAlign: 'center' }}>
        <h3>Gestión de Mercado</h3>
        <p>Seleccione una acción para administrar las ofertas de la plataforma.</p>
        
        <div className="menu-grid" style={{ marginTop: '20px' }}>
          {/* Usamos las funciones que vienen por props */}
          <button 
            className="btn-refresh main-btn" 
            onClick={alVerOfertas} 
          >
            🔍 Visualizar Ofertas P2P
          </button>

          <button 
            className="btn-refresh main-btn btn-accent" 
            onClick={alPublicar}
          >
            + Publicar mi Oferta
          </button>

          <button 
            className="btn-refresh main-btn" 
            onClick={alVerMisOfertas}
          >
            ⚙️ Gestionar Mis Ofertas
          </button>
        </div>
      </div>
    </section>
  );
};