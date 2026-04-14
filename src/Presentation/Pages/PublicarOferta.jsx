import React, { useState, useEffect } from 'react';
import { crearOferta } from '../../Data/consultarOfertas'; // Verifica que el nombre sea exacto

export const PublicarOferta = ({ user, onVolver }) => {
  // 1. Inicializamos el formulario. 
  // Usamos el ID que viene de la tabla usuarios
  const [form, setForm] = useState({
    usuario_id: user?.id || '', 
    monto: '',
    precio_propuesto: '',
    tipo: 'COMPRA',
    ubicacion: '' 
  });

  // 2. Efecto de seguridad: Si por alguna razón user.id cambia o tarda en llegar
  useEffect(() => {
    if (user?.id) {
      setForm(prev => ({ ...prev, usuario_id: user.id }));
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validación de seguridad para evitar el error "Incorrect integer value"
    if (!form.usuario_id) {
      alert("Error: No se detectó tu ID de usuario. Por favor, reincia sesión.");
      return;
    }

    // Convertimos valores a números para que MySQL no se queje
    const datosParaEnviar = {
      ...form,
      monto: parseFloat(form.monto),
      precio_propuesto: parseFloat(form.precio_propuesto)
    };

    const res = await crearOferta(datosParaEnviar);
    
    if (res.success) {
      alert("¡Oferta publicada exitosamente!");
      onVolver(); 
    } else {
      // Si sale el error de la imagen, aquí verás por qué
      alert("Error al publicar: " + res.error);
    }
  };

  return (
    <section className="form-container">
      <h3>Crear nueva oferta</h3>
      <form className="oferta-form" onSubmit={handleSubmit}>
        
        <label>Tipo de Operación</label>
        <select 
          value={form.tipo} 
          onChange={(e) => setForm({...form, tipo: e.target.value})}
        >
          <option value="COMPRA">Quiero Comprar Dólares</option>
          <option value="VENTA">Quiero Vender Dólares</option>
        </select>
        
        <label>Cantidad (USD)</label>
        <input 
          type="number" 
          placeholder="Ej: 100" 
          value={form.monto}
          onChange={(e) => setForm({...form, monto: e.target.value})}
          required 
        />
        
        <label>Precio Unitario (BS)</label>
        <input 
          type="number" 
          step="0.01" 
          placeholder="Ej: 12.50" 
          value={form.precio_propuesto}
          onChange={(e) => setForm({...form, precio_propuesto: e.target.value})}
          required 
        />

        <label>Ubicación de encuentro (RF2)</label>
        <input 
          type="text" 
          placeholder="Ej: Plaza Principal / Calacoto" 
          value={form.ubicacion}
          onChange={(e) => setForm({...form, ubicacion: e.target.value})}
          required 
        />
        
        <div className="modal-actions" style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn-save" style={{ flex: 2 }}>Publicar Ahora</button>
          <button type="button" onClick={onVolver} className="btn-cancel" style={{ flex: 1 }}>Cancelar</button>
        </div>
      </form>
    </section>
  );
};