import React, { useState, useEffect } from 'react';
import { obtenerTodasLasOfertas } from '../../Data/consultarOfertas';

export const VisualizarOfertas = ({ onVolver }) => {
  const [ofertas, setOfertas] = useState([]);

  useEffect(() => {
    const cargar = async () => {
      const datos = await obtenerTodasLasOfertas();
      if (!datos.error) setOfertas(datos);
    };
    cargar();
  }, []);

  // Función para generar el mensaje y abrir WhatsApp
  const handleContactar = (oferta) => {
    const telefono = oferta.celular; // Extraído de la base de datos (vía JOIN)
    const mensaje = encodeURIComponent(
      `Hola ${oferta.nombreU}, te hablo desde DolarApp. Me interesa tu oferta de ${oferta.tipo} de ${oferta.monto} USD a un precio de ${oferta.precio_propuesto} BS.`
    );
    
    // Esto funciona tanto en PC (WhatsApp Web) como en Celular (App)
    window.open(`https://wa.me/591${telefono}?text=${mensaje}`, '_blank');
  };

  return (
    <section>
      <div className="content-header-flex">
        <h3>Mercado de Ofertas P2P</h3>
        <button className="btn-edit" onClick={onVolver}>Volver</button>
      </div>
      <table className="tabla-empresarial">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Tipo</th>
            <th>Monto</th>
            <th>Precio Unitario</th>
            <th>Ubicación</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {ofertas.length > 0 ? (
            ofertas.map((o) => (
              <tr key={o.id}>
                <td>{o.nombreU}</td>
                <td style={{ color: o.tipo === 'VENTA' ? 'red' : 'green', fontWeight: 'bold' }}>
                  {o.tipo}
                </td>
                <td>{o.monto} USD</td>
                <td className="valor-destacado">{o.precio_propuesto} BS</td>
                <td>{o.ubicacion}</td>
                <td>
                  <button 
                    className="btn-edit" 
                    style={{ backgroundColor: '#25D366', color: 'white', border: 'none' }}
                    onClick={() => handleContactar(o)}
                  >
                    WhatsApp
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No hay ofertas disponibles en este momento.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};