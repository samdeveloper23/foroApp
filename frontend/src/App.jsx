import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Comprobar si el usuario tiene un token almacenado en el LocalStorage
    const token = localStorage.getItem('token');
    if (token) {
      // El usuario tiene un token, lo puedes utilizar para realizar acciones de autenticación
      setIsAuthenticated(true);
    } else {
      // El usuario no tiene un token
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route exact path="/home" element={<Home />} />
          //desde aqui montamos las zonas protegidas
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
