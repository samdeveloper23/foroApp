import { Route, Routes } from 'react-router-dom';
import './App.css';
import Normas from './pages/Normas';
import Login from './pages/Login';
import Register from './pages/Register';
import Gili from './pages/Gili';
import Navbar from './components/Navbar';

function App() {
  

  
  

  return (
    <div>
      <Navbar   />
      <Routes>
        <Route path="/" element={<Normas />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gili" element={<Gili />} />
      </Routes>
    </div>
  );
}

export default App;
