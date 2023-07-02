import { useState, useEffect } from 'react';
import axios from 'axios';

function Foro() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    // Lógica para obtener los hilos de conversación desde la API utilizando Axios

    axios.get('/api/threads')
      .then(response => setThreads(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h1>Hilos de conversación</h1>
      {threads.map(thread => (
        <div key={thread.id}>
          <h2>{thread.title}</h2>
          <p>{thread.content}</p>
        </div>
      ))}
    </div>
  );
}

export default Foro;
