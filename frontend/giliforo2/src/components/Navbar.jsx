import {NavLink} from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
    
    return (
        <div className='navbar'>
            <div className='title'>
                <h1>Gili 2</h1>
            </div>
            <div className='navigater'>
                <NavLink className='link' to='/'>Normas</NavLink>
                <NavLink className='link' to='gili'>Gili</NavLink>
                <NavLink className='link' to='login'>Login</NavLink>
                <NavLink className='link' to='register'>Regístrate!</NavLink>
            </div>
        </div>
    )
};
export default Navbar;