import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from "./AppContext";
export default function Nav2() {
    const { isUserLogged, handleLogout } = useContext(AppContext);
    const logOut = () => {
        localStorage.removeItem('token'); // Eliminar el token del localStorage
        handleLogout(); // Actualizar el estado de autenticación en el contexto
    };
    return (
        <ul className="navbar-nav ms-auto">
            <li className="nav-item dropstart">
                <a className="nav-link text-start btn btn-white dropdown-toggle" href="#" data-bs-toggle="dropdown" aria-expanded="false" >
                    <i className="bi bi-person-fill"></i>
                    <span className="ms-1 d-lg-none">Cuenta</span>
                </a>
                <ul className="dropdown-menu">
                    {!isUserLogged && (
                        <>
                            <li className='dropdown-item'>
                                <NavLink to="/login" className="text-reset text-decoration-none">Iniciar Sesión</NavLink>
                            </li>
                            <li className="dropdown-item">
                                <NavLink to="/registro" className="text-reset text-decoration-none">Regístrate</NavLink>
                            </li>
                        </>
                    )}
                    {isUserLogged && (
                        <>
                            <li className='dropdown-item'>
                                <span className="navlinkName">¡Bienvenido!</span>
                            </li>
                            <li className='dropdown-item'>
                                <NavLink to="/" onClick={logOut} className="custom-active-class dropdown-item">Cerrar Sesión</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/listaDeseos">
                    <i className="bi bi-heart-fill"></i>
                    <span className="ms-1 d-lg-none">Lista de Deseos</span>
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to="/carrito">
                    <i className="bi bi-cart3"></i>
                    <span className="ms-1 d-lg-none">Carrito</span>
                </NavLink>
            </li>
        </ul>
    );
}
