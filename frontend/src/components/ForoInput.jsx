import { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './Foro.css';

function ForoInput({ onThreadAdded }) {
  const [content, setContent] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    // Decodificar el token para obtener la información del usuario
    const decodedToken = jwt_decode(token);

    const newThread = {
      content,
      userId: decodedToken.userId
    };

    axios.post('http://192.168.1.35:4000/api/home/threads', newThread)
      .then(response => {
        onThreadAdded(response.data);
        setContent('');
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <form className='form' onSubmit={handleFormSubmit}>
        <label className='label'>
          Gili:
          <textarea
            className='textarea'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </label>
        <br />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default ForoInput;
