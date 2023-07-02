import { useState } from 'react';
import axios from 'axios';
import './access.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userOn, setUserOn] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://192.168.1.35:4000/api/login', { username, password });
      
      // Verificar si la respuesta existe y tiene la propiedad 'data'
      if (response && response.data) {
        const { token, id, username } = response.data;
        console.log(response.data);
        // Guardar el token, ID y el nombre de usuario en el LocalStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', id);
        localStorage.setItem('username', username);
        
        // Configurar el token en el encabezado de autorización
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        
        // Restablecer los campos de entrada y el estado de error
        setUsername('');
        setPassword('');
        setError('');
        setUserOn(true);
      } else {
        // Manejar la respuesta inesperada del servidor
        setError('Error de inicio de sesión');
      }
    } catch (error) {
      // Si ocurre un error, puedes manejarlo aquí
      setError(error.response.data.message);
    }
  };

  return (
    <div className='registro'>
      {userOn ? (
                <>
                <h2 className="intro">Adelante entra y diviertete</h2>
                <button className="button-esp"><a href="http://192.168.1.35:5173/home">Inicio</a></button> </> ): (
      <>
      <h2 className='intro'>Login</h2>
      {error && <p className='error'>{error}</p>}
      <form className='form' onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      </>)
 } </div>
  );
};

export default Login;
