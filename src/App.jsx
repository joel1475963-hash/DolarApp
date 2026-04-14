import { useState } from 'react';
import './App.css';
import { Administrador } from './Presentation/Pages/Administrador';
import { buscarUsuarioPorCredenciales } from './Data/consultaUsuarios';
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
    const data = await buscarUsuarioPorCredenciales(credentials.nombreU, credentials.contrasena);
    setLoading(false);

    if (data && !data.error) {
      setUser(data);
    } else {
      alert("Error: Usuario o contraseña incorrectos");
    }
  };

  const logout = () => {
    setUser(null);
    setEsRegistro(false);
  };

  // --- LOGICA DE VISTAS PARA USUARIOS NO AUTENTICADOS ---
  if (!user) {
    // Si el usuario hizo clic en "Registrarse", mostramos esa página
    if (esRegistro) {
      return <Registrarse onVolver={() => setEsRegistro(false)} />;
    }

    // Por defecto mostramos el Login
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

  // --- REDIRECCIÓN SEGÚN ROL ---
  if (user.rol === 'Administrador') {
    return <Administrador user={user} onLogout={logout} />;
  }
  if (user.rol === 'Usuario') {
    return <Usuario user={user} onLogout={logout} />;
  }

}

export default App;