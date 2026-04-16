import { API_URL } from './conexion';

class ConsultaUsuarios {
    constructor() {
        this.url = `${API_URL}/api.php`;
        this.headers = { 'Content-Type': 'application/json' };
    }

    // Método privado para evitar repetir código en cada fetch
    async #peticion(body) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify(body)
            });
            return await response.json();
        } catch (error) {
            console.error(`Error en la acción ${body.accion}:`, error);
            return { error: "No se pudo conectar con el servidor" };
        }
    }

    async login(username, password) {
        return await this.#peticion({
            accion: 'login',
            nombreU: username,
            contrasena: password
        });
    }

    async registrar(datos) {
        return await this.#peticion({ accion: 'registrar', ...datos });
    }

    async obtenerTodos() {
        return await this.#peticion({ accion: 'obtener_usuarios' });
    }

    async actualizar(usuario) {
        return await this.#peticion({ accion: 'actualizarUsuario', ...usuario });
    }

    async eliminar(id) {
        return await this.#peticion({ accion: 'eliminarUsuario', id });
    }

    async verificarDuplicado(valor) {
        try {
            // Enviamos el CI por la URL (GET)
            const response = await fetch(`${this.url}?accion=verificar&ci=${valor}`);
            const data = await response.json();
            return data.existe; // Retorna true o false
        } catch (error) {
            return false;
        }
    }
}
export const consultaUsuarios = new ConsultaUsuarios();