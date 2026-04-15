import { API_URL } from './conexion';
//Aqui estan las consultas de Cambio o TipoCambio

export const obtenerTiposCambio = async () => {
    const response = await fetch(`${API_URL}/api.php`, {
        method: 'POST',
        body: JSON.stringify({ accion: 'obtenerCambio' })
    });
    return await response.json();
};
export const crearTipoCambio = async (nuevo) => {
    const res = await fetch(`${API_URL}/api.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion: 'crearCambio', ...nuevo })
    });
    return await res.json();
};
export const actualizarTipoCambio = async (datos) => {
    const response = await fetch(`${API_URL}/api.php`, {
        method: 'POST',
        body: JSON.stringify({ 
            accion: 'actualizarCambio', 
            ...datos 
        })
    });
    return await response.json();
};
export const eliminarTipoCambio = async (id) => {
    const res = await fetch(`${API_URL}/api.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion: 'eliminarCambio', id })
    });
    return await res.json();
};