import { API_URL } from './conexion';

//Esta es la consulta de Usuarios 

export const buscarUsuarioPorCredenciales = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/api.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                accion: 'login',
                nombreU: username, 
                contrasena: password 
            })
        });
        const data = await response.json();
        
        return data;
    } catch (error) {
        console.error("Error en login:", error);
        return { error: "No se pudo conectar con el servidor" };
    }
};

export const registrarNuevoUsuario = async (datos) => {
    try {
        const response = await fetch(`${API_URL}/api.php`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accion: 'registrar', ...datos })
        });
        return await response.json();
    } catch (error) {
        console.error("Error en registro:", error);
        return { error: "Error de red al registrar" };
    }
};