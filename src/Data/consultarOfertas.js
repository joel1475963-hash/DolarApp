import { API_URL } from './conexion';

//Aqui estan las consultas de Ofertas mediante la api

export const obtenerTodasLasOfertas = async () => {
    try {
        const response = await fetch(`${API_URL}/api.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accion: 'obtenerOfertas' })
        });
        return await response.json();
    } catch (error) {
        console.error("Error al obtener ofertas:", error);
        return { error: "No se pudo conectar con el servidor" };
    }
};


export const obtenerMisOfertas = async (usuarioId) => {
    try {
        const response = await fetch(`${API_URL}/api.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                accion: 'obtenerMisOfertas', 
                usuario_id: usuarioId 
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Error al obtener mis ofertas:", error);
        return { error: "Error de conexión" };
    }
};

export const crearOferta = async (datosOferta) => {
    try {
        const response = await fetch(`${API_URL}/api.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                accion: 'crearOferta', 
                ...datosOferta 
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Error al publicar:", error);
        return { error: "No se pudo publicar la oferta" };
    }
};
export const actualizarOferta = async (oferta) => {
    try {
        const response = await fetch(`${API_URL}/api.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                accion: 'actualizarOferta', 
                id: oferta.id,
                monto: oferta.monto,
                precio: oferta.precio_propuesto,
                estado: oferta.estado
            })
        });
        return await response.json();
    } catch (error) {
        return { error: "No se pudo actualizar" };
    }
};
export const eliminarOferta = async (id) => {
    const response = await fetch(`${API_URL}/api.php`, {
        method: 'POST',
        body: JSON.stringify({ accion: 'eliminarOferta', id: id })
    });
    return await response.json();
};