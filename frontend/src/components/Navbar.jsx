import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">GiliForo</div>
      <ul className="nav-links">
        <li>
          <a href="/">Inicio</a>
        </li>
        <li>
          <a href="/perfil">Perfil</a>
        </li>
        <li>
          <a href="/login">Iniciar Sesión</a>
        </li>
        <li>
          <a href="/register">Registrarse</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
