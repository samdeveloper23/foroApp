import { useState } from 'react';
import { registerUser } from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
    await registerUser(username, password);
     
      navigate('/login');
    } catch (error) {
      // Maneja el error de registro
      setErrorMessage('Error al registrar usuario. Por favor, verifica los datos e intenta nuevamente.');
      console.error(error.message);
    }
  };

  return (
    <div className='container'>
        <form className="border-register" onSubmit={handleFormSubmit}>
        <h2 className='regis'>Regístrate</h2>
            <div>
            <label htmlFor="username">Usuario:</label>
                <input
                className='input'
                type="text"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
            <label htmlFor="username">Contraseña:</label>
                <input
                className='input'
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                </div>
            <button className='button' type="submit">Registrarse</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
    </div>
  );
};

export default Register;
