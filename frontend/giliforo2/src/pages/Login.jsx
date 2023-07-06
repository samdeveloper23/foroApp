import { useState } from 'react';
import { loginUser } from '../api/api.js';
import { useNavigate} from 'react-router-dom'
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);
      // Obtiene el token de la respuesta y lo guarda en el estado
      const token = response.data.token;

      localStorage.setItem('token', token);
      setToken(token);
     navigate('/gili');
    } catch (error) {
      // Maneja el error de autenticación
      setErrorMessage('Credenciales incorrectas. Por favor, verifica tu nombre de usuario y contraseña.');
      console.error(error.message);
    }
  };

  return (
    <div className="container">
        <form className='border-login' onSubmit={handleFormSubmit}>
        <h2 className='log'>Login</h2>
        <div>
            <label htmlFor="username">Usuario:</label>
            <input
            className='input'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div>
            <label htmlFor="password">Contraseña:</label>
            <input
            className='input'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <button className='button' type="submit">Iniciar sesión</button>
        {errorMessage && <p>{errorMessage}</p>}
        </form>
    </div>
  );
};

export default Login;
