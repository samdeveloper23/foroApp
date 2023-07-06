import { useEffect, useState } from 'react';
import './gili.css'
import axios from 'axios';


const Gili = () => {
  const securiti = localStorage.getItem('token');
  

  
   

  const [sec, setSec] = useState(false);
  
    useEffect(() => {
        if (securiti) {
            setSec(true);
        }
    })

  const [gilipolleces, setGilipolleces] = useState([]);
  const [newGilipollez, setNewGilipollez] = useState('');

  useEffect(() => {
    fetchGilipolleces();
  }, []);

  const fetchGilipolleces = async () => {
    try {
      const token = localStorage.getItem('token');

      const headers = { Authorization: token };

      const response = await axios.get('https://giliforo2.fly.dev/gili', { headers });
      const data = response.data.data;

      const formattedGilipolleces = data.map((gili) => {
        return {
          username: gili.username,
          gilipollez: gili.gili,
        };
      });

      setGilipolleces(formattedGilipolleces);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const headers = { Authorization: token };
      const data = { gili: newGilipollez };

      await axios.post('https://giliforo2.fly.dev/gili', data, { headers });

      // Obtener la lista actualizada después de enviar la gilipollez
      fetchGilipolleces();

      setNewGilipollez('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container-gili'>
      <div className="border-gili">
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="gilipollez">Gilipollez</label>
            <textarea
              className='input-gili'
              type="textarea"
              value={newGilipollez}
              onChange={(e) => setNewGilipollez(e.target.value)}
            />
          </div>
          <button className='button' type="submit" >decir..</button>
        </form>
      </div>
      <div >
        {sec ? 
        <ul className='none'>
          {gilipolleces.map((gili, index) => (
            <li className='none-back' key={index}>
              <h3>-Autor: {gili.username}</h3>
              <p>-Gili... {gili.gilipollez}</p>
            </li>
          ))}
        </ul>
        :
        <div className='border-gili'>
         <h2>¡Dónde vas tan rapido!!</h2>
            <p>Logueate ántes o regístrate si no eres usuario</p>
            <p>¡te divertiras!</p>
        </div>  }
      </div>
    </div>
  );
};

export default Gili;
