import './Foro.css';

function ForoList({ threads }) {
    const reversedThreads = [...threads].reverse(); // Invierte el orden de los elementos
    const lastFiveThreads = reversedThreads.slice(0, 5); // Obtiene las cinco primeras publicaciones
  
    return (
      <div className='content'>
        {lastFiveThreads.map(thread => (
          <div className='posts' key={thread.id}>
            <h2>{thread.User?.username}</h2>
            <p className='contenido'>{thread.content}</p>
          </div>
        ))}
      </div>
    );
  }
  
  export default ForoList;
  