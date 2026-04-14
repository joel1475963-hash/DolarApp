import React, { useState, useEffect } from 'react';
import { obtenerTiposCambio } from '../../Data/consultarCambio';

export const TipoCambio = () => {
  const [listaCambios, setListaCambios] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      const datos = await obtenerTiposCambio();
      if (datos && !datos.error) setListaCambios(datos);
      setCargando(false);
    };
    cargarDatos();
  }, []);

  if (cargando) return <p>Actualizando tipos de cambio...</p>;

  return (
    <table className="tabla-empresarial">
      <thead>
        <tr>
          <th>Moneda</th>
          <th>Valor de Cambio</th>
          <th>Fuente</th>
        </tr>
      </thead>
      <tbody>
        {listaCambios.map((item) => (
          <tr key={item.id}>
            <td>{item.nombre}</td>
            <td className="valor-destacado">{item.valor}</td>
            <td>{item.fuente}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
