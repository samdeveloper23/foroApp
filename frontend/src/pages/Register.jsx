import { useState } from "react";
import axios from 'axios';
import './access.css';


const Register = () => {
    // Aquí puedes definir los estados para los campos del formulario
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userOn, setUserOn] = useState(false);
  
    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Objeto con los datos del usuario a registrar
      const userData = {
        username,
        email,
        password,
      };
  
      try {
        // Realizar una solicitud POST al backend para registrar el usuario
        const response = await axios.post('http://192.168.1.35:4000/api/register', userData);
        console.log('Usuario registrado:', response.data);
        setUserOn(true);
        
        // Aquí puedes realizar redirecciones o mostrar un mensaje de éxito al usuario
      } catch (error) {
        console.error('Error al registrar el usuario:', error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    };
  
    return (
        <div className="registro">
            {userOn ? (
                <>
                <h2 className="intro">Ya estas registrado, ahora logeate y diviertete!</h2>
                <button className="button-esp"><a href="http://192.168.1.35:5173/login">Login</a></button> </> ): (
                    
        <>
        <h2 className="intro">Registrate</h2>    
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>
      </>)}
      </div>
    );
  };
  
  export default Register;
  