import { useState } from 'react';
import './App.css';
import { Administrador } from './Presentation/Pages/Administrador';
// Cambiamos la función suelta por la instancia de la clase
import { consultaUsuarios } from './Data/consultaUsuarios';
import { Registrarse } from './Presentation/Pages/Registrarse';
import { Usuario } from './Presentation/Pages/Usuario';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ nombreU: '', contrasena: '' });
  const [esRegistro, setEsRegistro] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Llamamos al método login de la clase
    const data = await consultaUsuarios.login(credentials.nombreU, credentials.contrasena);
    
    setLoading(false);

    if (data && !data.error) {
      setUser(data);
    } else {
      // Usamos el error que viene de la API si existe, si no, el mensaje genérico
      alert(data.error || "Error: Usuario o contraseña incorrectos");
    }
  };

  const logout = () => {
    setUser(null);
    setEsRegistro(false);
    // Opcional: limpiar credenciales al salir
    setCredentials({ nombreU: '', contrasena: '' });
  };

  // --- LÓGICA DE VISTAS PARA USUARIOS NO AUTENTICADOS ---
  if (!user) {
    if (esRegistro) {
      return <Registrarse onVolver={() => setEsRegistro(false)} />;
    }

    return (
      <div className="login-screen">
        <form onSubmit={handleLogin} className="login-card">
          <h1>DolarApp Login</h1>
          <input 
            type="text" 
            placeholder="Usuario" 
            autoComplete="username"
            onChange={(e) => setCredentials({...credentials, nombreU: e.target.value})}
            required 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            autoComplete="current-password"
            onChange={(e) => setCredentials({...credentials, contrasena: e.target.value})}
            required 
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Entrando...' : 'Ingresar'}
          </button>
          
          <div className="login-footer">
            <p>¿No tienes cuenta? <span onClick={() => setEsRegistro(true)} className="link-text">Regístrate aquí</span></p>
          </div>
        </form>
      </div>
    );
  }


  if (user.rol === 'Administrador') {
    return <Administrador user={user} onLogout={logout} />;
  }
  
  if (user.rol === 'Usuario') {
    return <Usuario user={user} onLogout={logout} />;
  }


  return <div>Error: Rol no reconocido. Contacte al administrador.</div>;
}

export default App;