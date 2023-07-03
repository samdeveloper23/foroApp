import { useState, useEffect } from 'react';
import axios from 'axios';
import ForoInput from './ForoInput';
import ForoList from './ForoList';
import './Foro.css';

function Foro() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get('http://192.168.1.35:4000/api/home/threads')
      .then(response => setThreads(response.data))
      .catch(error => console.error(error));
  }, []);

  const getThreads = () => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get('http://192.168.1.35:4000/api/home/threads')
      .then(response => setThreads(response.data))
      .catch(error => console.error(error));
  };

  const handleThreadAdded = (newThread) => {
    setThreads([...threads, newThread]);
    getThreads();
  };

  return (
    <div className='foro'>
      <ForoInput onThreadAdded={handleThreadAdded} />
      <ForoList threads={threads} />
    </div>
  );
}

export default Foro;
